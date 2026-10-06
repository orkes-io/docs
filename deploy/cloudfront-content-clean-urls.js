// CloudFront Function (viewer-request, runtime cloudfront-js-1.0).
// Attach to the /content/* behavior on the marketing distribution.
//
// The MkDocs build serves clean URLs (e.g. /content/quickstarts). Postprocess
// produces both `foo.html` and `foo/index.html` (trailing-slash aliases), so we
// map directory/extensionless requests to `index.html`. Requests that already
// have a file extension (.css/.js/.png/…) pass through untouched.
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri.endsWith("/")) {
    request.uri = uri + "index.html";
  } else if (uri.lastIndexOf(".") <= uri.lastIndexOf("/")) {
    // No file extension in the last path segment → treat as a page.
    request.uri = uri + "/index.html";
  }
  return request;
}
