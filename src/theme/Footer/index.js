import React from "react";
import "./footer.css";
function Footer() {
  // This is a completely custom footer.
  // You can add any valid JSX here.
  return (
    <section className="nw_footer">
      <div className="nw_standard-container">
        <div className="nw_footer_topsection">
          <div className="nw_footer-column">
            <a href="/" className="orkes-logo w-nav-brand">
              <img
                src="https://cdn.prod.website-files.com/6466c9e390eac6bcd0399387/64a69ced2778aa2772c1e85d_orkes-logo-purple.svg"
                loading="lazy"
                width="125"
                alt="Orkes logo image
"
              />
            </a>
          </div>
          <div className="footer_navwrapper">
            <div className="footer_navsubcolumnwrapper _40">
              <div className="nw_footer-column _33">
                <h2 className="nw_footerheader">Company</h2>
                <div className="nw_footerlinks_wrapper">
                  <a href="/platform" className="nw_footerlinks w-inline-block">
                    <div className="footer-type">Platform</div>
                  </a>
                  <a
                    href="/careers"
                    className="nw_footerlinks hiring w-inline-block"
                  >
                    <div className="flex-horizontal">
                      <div className="underline-hover">
                        <div className="footer-type">Careers</div>
                      </div>
                      <div className="rounded-hiring-tag">
                        <div className="footer-type-tag">HIRING!</div>
                      </div>
                    </div>
                  </a>
                  <a
                    href="https://orkesio.partnerportal.io/sign-in"
                    target="_blank"
                    className="nw_footerlinks w-inline-block"
                  >
                    <div className="footer-type">Partners</div>
                  </a>
                  <a href="/about-us" className="nw_footerlinks w-inline-block">
                    <div className="footer-type">About Us</div>
                  </a>
                  <a
                    href="https://orkes.io/legal"
                    className="nw_footerlinks w-inline-block"
                  >
                    <div className="footer-type">Legal Hub</div>
                  </a>
                  <a
                    href="https://orkes.io/security"
                    className="nw_footerlinks w-inline-block"
                  >
                    <div className="footer-type">Security</div>
                  </a>
                </div>
              </div>
              <div className="nw_footer-column _33">
                <h2 className="nw_footerheader">Product</h2>
                <div className="nw_footerlinks_wrapper">
                  <a
                    href="https://cloud.orkes.io/"
                    className="nw_footerlinks w-inline-block"
                  >
                    <div className="footer-type">Cloud</div>
                  </a>
                  <a href="/platform" className="nw_footerlinks w-inline-block">
                    <div className="footer-type">Platform</div>
                  </a>
                  <a
                    href="https://orkeshelp.zendesk.com/auth/v2/login/signin?return_to=https%3A%2F%2Fsupport.orkes.io%2Fhc%2Fen-us&amp;theme=hc&amp;locale=en-us&amp;brand_id=4415595945364&amp;auth_origin=4415595945364%2Ctrue%2Ctrue"
                    target="_blank"
                    className="nw_footerlinks w-inline-block"
                  >
                    <div className="footer-type">Support</div>
                  </a>
                </div>
              </div>
              <div className="nw_footer-column _33">
                <h2 className="nw_footerheader">Community</h2>
                <div className="nw_footerlinks_wrapper">
                  <a
                    href="https://orkes.io/content"
                    className="nw_footerlinks w-inline-block"
                  >
                    <div className="footer-type">Docs</div>
                  </a>
                  <a
                    href="https://orkes.io/blog/"
                    className="nw_footerlinks w-inline-block"
                  >
                    <div className="footer-type">Blogs</div>
                  </a>
                  <a
                    href="https://orkes.io/events/"
                    className="nw_footerlinks w-inline-block"
                  >
                    <div className="footer-type">Events</div>
                  </a>
                </div>
              </div>
            </div>
            <div className="footer_navsubcolumnwrapper">
              <div className="nw_footer-column">
                <h2 className="nw_footerheader">Use Cases</h2>
                <div className="nw_footerlinks_wrapper">
                  <a
                    href="/use-cases/microservices-orchestration"
                    className="nw_footerlinks w-inline-block"
                  >
                    <div className="footer-type">
                      Microservices Workflow Orchestration
                    </div>
                  </a>
                  <a
                    href="/use-cases/api-orchestration"
                    className="nw_footerlinks w-inline-block"
                  >
                    <div className="footer-type">
                      Realtime API Orchestration
                    </div>
                  </a>
                  <a
                    href="/use-cases/event-driven-architecture"
                    className="nw_footerlinks w-inline-block"
                  >
                    <div className="footer-type">Event Driven Architecture</div>
                  </a>
                  <a
                    href="/use-cases/agentic-workflows"
                    className="nw_footerlinks w-inline-block"
                  >
                    <div className="footer-type">Agentic Workflows</div>
                  </a>
                  <a
                    href="/use-cases/human-workflow-orchestration"
                    className="nw_footerlinks w-inline-block"
                  >
                    <div className="footer-type">
                      Human Workflow Orchestration
                    </div>
                  </a>
                  <a
                    href="/use-cases/process-orchestration"
                    className="nw_footerlinks w-inline-block"
                  >
                    <div className="footer-type">Process Orchestration</div>
                  </a>
                </div>
              </div>
              <div className="nw_footer-column auto">
                <h2 className="nw_footerheader">Compare</h2>
                <div className="nw_footerlinks_wrapper">
                  <a
                    href="/compare/orkes-conductor-vs-camunda-bpmn"
                    className="nw_footerlinks w-inline-block"
                  >
                    <div className="footer-type">
                      Orkes VS&nbsp;Camunda (BPMN)
                    </div>
                  </a>
                  <a
                    href="/compare/orkes-conductor-vs-langchain"
                    className="nw_footerlinks w-inline-block"
                  >
                    <div className="footer-type">Orkes VS&nbsp;LangChain</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="nw_footerdivider"></div>
        <div className="nw_footerlastsection">
          <div className="footer-social-icons remove_margin">
            <a
              href="https://twitter.com/orkesio"
              target="_blank"
              className="nw_footersociallinks w-inline-block"
            >
              <img
                src="https://cdn.prod.website-files.com/6466c9e390eac6bcd0399387/656d513f20c5cb6bde6c7609_TwitterX.svg"
                loading="lazy"
                alt="Twitter or X Socials link"
                className="nw_socialcircularicon"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/orkes-inc"
              target="_blank"
              className="nw_footersociallinks w-inline-block"
            >
              <img
                src="https://cdn.prod.website-files.com/6466c9e390eac6bcd0399387/656d513fb149e5acd8545a8d_LinkedIn.svg"
                loading="lazy"
                alt="LinkedIn Socials link"
                className="nw_socialcircularicon"
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UCI7sk4DD6F6r9CWg9gHRlVg"
              target="_blank"
              className="nw_footersociallinks w-inline-block"
            >
              <img
                src="https://cdn.prod.website-files.com/6466c9e390eac6bcd0399387/656d513f5e078c290d9a1aa0_Youtube.svg"
                loading="lazy"
                alt="YouTube Socials link"
                className="nw_socialcircularicon"
              />
            </a>
            <a
              href="https://orkes-conductor.slack.com/join/shared_invite/zt-2vdbx239s-Eacdyqya9giNLHfrCavfaA#/shared-invite/email"
              target="_blank"
              className="nw_footersociallinks w-inline-block"
            >
              <img
                src="https://cdn.prod.website-files.com/6466c9e390eac6bcd0399387/656d513f88c14fc984988906_Slack.svg"
                loading="lazy"
                alt="Slack Socials link"
                className="nw_socialcircularicon"
              />
            </a>
            <a
              href="https://github.com/conductor-oss/conductor"
              target="_blank"
              className="nw_footersociallinks w-inline-block"
            >
              <img
                src="https://cdn.prod.website-files.com/6466c9e390eac6bcd0399387/656d513f3a1fc8aff4e56f61_Github.svg"
                loading="lazy"
                alt="Github Socials link"
                className="nw_socialcircularicon"
              />
            </a>
            <a
              href="https://www.facebook.com/orkes.io"
              target="_blank"
              className="nw_footersociallinks w-inline-block"
            >
              <img
                src="https://cdn.prod.website-files.com/6466c9e390eac6bcd0399387/6639d7b9bf173f2adca84dfd_Facebook.svg"
                loading="lazy"
                alt="Facebook icon"
                className="nw_socialcircularicon"
              />
            </a>
            <a
              href="https://www.instagram.com/orkes.io/"
              target="_blank"
              className="nw_footersociallinks w-inline-block"
            >
              <img
                src="https://cdn.prod.website-files.com/6466c9e390eac6bcd0399387/6639d7b9394192b37c3c7837_Instagram.svg"
                loading="lazy"
                alt="Instagram icon"
                className="nw_socialcircularicon"
              />
            </a>
            <a
              href="https://www.tiktok.com/@orkes.io"
              target="_blank"
              className="nw_footersociallinks w-inline-block"
            >
              <img
                src="https://cdn.prod.website-files.com/6466c9e390eac6bcd0399387/6639d7b9a9e1013b290d6e5f_TikTok.svg"
                loading="lazy"
                alt="Tik Tok icon"
                className="nw_socialcircularicon"
              />
            </a>
          </div>
          <div className="footer-type">
            © <span className="copy-year">2025</span> Orkes. All Rights
            Reserved.
          </div>
        </div>
      </div>
      <div className="w-embed w-script"></div>
    </section>
  );
}

export default React.memo(Footer);
