# Frequently Asked Questions

## Conductor Server

### How do I adjust the logging levels?

Conductor is Spring Boot based; hence, the log levels are set via Spring Boot properties. Refer to the doc on [adjusting logging levels](https://orkes.io/content/docs/how-tos/Monitoring/Conductor-LogLevel) for more details.

## Access Control

### How to generate an access token?

In Orkes Cloud, there are two ways:

- For testing purposes, use a [token from your dashboard](https://orkes.io/content/docs/getting-started/concepts/access-control-applications#prototyping). These expire with your session.
- Or you can create an [application, and use a key/secret to generate a token](https://orkes.io/content/docs/getting-started/concepts/access-control-applications#application). These tokens do not currently expire, but this is expected to change.
