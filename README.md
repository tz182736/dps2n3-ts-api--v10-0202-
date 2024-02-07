# Understanding source code

[project man/hours]
- version numbering v{X-xxxx} (version-mmdd) - manhours
(v7.1230)

[quick read]
- generate JSDoc $typedoc --out docs ./src
- will deploy with alpine linux

## New features

- function key to select last entry [1230]
- noti on mobile for all subscribed users [1230]
- hot numbers ? [1230]
- hover row highlith for numbers list [1230]

## Assit Tools

npm cache clean --force

Line number mask for locating error in source code:  "!~82:
tracking !~(\d+) (.*?) DpsStream

[https://learn.microsoft.com/en-us/windows/wsl/install-manual]
>dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
>

## Test case tools

[https://www.npmjs.com/package/ts-jest]
$ npm i -D jest typescript
$ npm i -D ts-jest @types/jest
$ npx ts-jest config:init
$ npm test or npx jest
https://jestjs.io/docs/configuration

## Overall program flow logic

[grpc update fail scenario]
1 -  Sale Number was missing on server. ( can prevent by resync on connect before add number from client)

## Authentication without interceptor (grpc-js server not support interceptor yet)

```ts

    // check metadata on every server call as below
   // Get the metadata from the call
   const metadata = call.metadata;
   // Get the token from the metadata
   const token = metadata.get("token")[0];
   // Validate the token (this is just a dummy example, you should use a proper validation logic)
   if (token === "secret") {
      // If the token is valid, proceed with the call
      callback(null, { message: "Hello, " + call.request.name });
   } else {
      // If the token is invalid, return an error
      callback({
         code: grpc.status.UNAUTHENTICATED,
         message: "Invalid token",
      });
   }

    // set metadata on client side
    const metadata = new grpc.Metadata();
    metadata.set("token", "secret");

```
 