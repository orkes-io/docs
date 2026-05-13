#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOCK_FILE="${ROOT}/shared-docs.lock.yml"

value_for() {
  local key="$1"
  awk -F': ' -v key="${key}" '$1 == key { print $2; exit }' "${LOCK_FILE}"
}

REPO="$(value_for repo)"
REF="$(value_for ref)"
CACHE_DIR="${ROOT}/$(value_for cache_dir)"

if [[ -z "${REPO}" || -z "${REF}" || -z "${CACHE_DIR}" ]]; then
  echo "shared-docs.lock.yml is missing repo, ref, or cache_dir" >&2
  exit 1
fi

if [[ ! -d "${CACHE_DIR}/.git" ]]; then
  rm -rf "${CACHE_DIR}"
  git clone --filter=blob:none --no-checkout "${REPO}" "${CACHE_DIR}"
fi

git -C "${CACHE_DIR}" fetch --depth 1 origin "${REF}"
git -C "${CACHE_DIR}" checkout --detach "${REF}"

PATHS=()
while IFS= read -r path; do
  PATHS+=("${path}")
done < <(awk '/^paths:/ { in_paths=1; next } in_paths && /^  - / { sub(/^  - /, ""); print } in_paths && /^[^ ]/ { in_paths=0 }' "${LOCK_FILE}")

if [[ "${#PATHS[@]}" -eq 0 ]]; then
  echo "shared-docs.lock.yml has no paths" >&2
  exit 1
fi

if git -C "${CACHE_DIR}" sparse-checkout list >/dev/null 2>&1; then
  git -C "${CACHE_DIR}" sparse-checkout disable
  git -C "${CACHE_DIR}" checkout --detach "${REF}" >/dev/null
fi

MISSING_PATHS=()
for path in "${PATHS[@]}"; do
  if [[ ! -e "${CACHE_DIR}/${path}" ]]; then
    MISSING_PATHS+=("${path}")
  fi
done

if [[ "${#MISSING_PATHS[@]}" -gt 0 ]]; then
  echo "shared OSS docs checkout is missing locked paths:" >&2
  for path in "${MISSING_PATHS[@]}"; do
    echo "- ${path}" >&2
  done
  exit 1
fi

echo "Fetched shared OSS docs at ${REF}"
