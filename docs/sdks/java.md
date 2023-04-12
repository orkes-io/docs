
# Orkes Conductor Java SDK

Orkes Conductor Java SDK is maintained here: https://github.com/orkes-io/orkes-conductor-client

## Dependencies

Add `orkes-conductor-client` dependency to your project

### Gradle
```
implementation 'io.orkes.conductor:orkes-conductor-client:1.1.14'
```
### Maven
```
<dependency>
  <groupId>io.orkes.conductor</groupId>
  <artifactId>orkes-conductor-client</artifactId>
  <version>1.1.14</version>
</dependency>
```

## Initialization

Everything related to server settings should be done within the `ApiClient` class, by setting the required parameters when initializing an object, like this:

```java
ApiClient apiClient = new ApiClient("https://play.orkes.io/api");
```

If we are using Spring Framework, we can initialize the above class as a bean that can be used across the project.

### Authentication Settings (optional)

See [Security via Applications](/content/access-control-and-security/applications#generating-access-keys) or this [video](/content/how-to-videos/access-key-and-secret) for details on how to get an access key and secret.

Once we have a key and secret, we can configure in the app from properties or environment variables as shown in this example:

```java
    String key = System.getenv("KEY");
    String secret = System.getenv("SECRET");
    String conductorServer = System.getenv("CONDUCTOR_SERVER_URL");
    ApiClient apiClient = new ApiClient(conductorServer, key, secret);
```

Remember to protect your app secrets like any other secrets or passwords.

## Related Topics

- Video Guide on [Getting Access Key and Secret](/content/how-to-videos/access-key-and-secret)
- [Access Control & Security](/content/category/access-control-and-security)

