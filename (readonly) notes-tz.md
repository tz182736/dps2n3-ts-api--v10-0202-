# 20231019  record of node 21 installation procedure for grpc

## append to sync back

```ts

// explain this code why setImmediate was call last ,const baz = () => console.log('baz');
const foo = () => console.log('foo');
const zoo = () => console.log('zoo');
const start = () => {
  console.log('start');
  setImmediate(baz);
  new Promise((resolve, reject) => {
    resolve('bar');
  }).then(resolve => {
    console.log(resolve);
    process.nextTick(zoo);
  });
  process.nextTick(foo);
};
start();
// start foo bar zoo baz
```

[typescript-optional utility]
Require, Partial, Omit, Pick
Omit<Required<DpsQueryArgs>, 'betType'>
Required<Pick<DpsQueryArgs, 'betType' | 'betPeriod'>>

https://www.npmjs.com/package/ts-proto
https://www.npmjs.com/package/nice-grpc 

- tslog comes with default log level 0: silly, 1: trace, 2: debug, 3: info, 4: warn, 5: error, 6: fatal.

[ts-notes]
In JSDoc, the equal sign (=) after a parameter type indicates that the parameter is optional.

```JSDoc
/**
 * @param {boolean=} myParam - An optional boolean parameter.
 */
 ```

## decide to moving forward with typescript

- 20231025 start test grpc with proto-loader from google team
- 20231023 spend 4 days to get starter call working on typescript,
- with the help of google astrology calculation

## question to ai :P

- I decide to go with grpc proto-loader to generate ts file for proto, typescript noednext with fix-esm-import-path for import es issues with tsc in generated file. using tsc to compile and deploy with rollup. ignore protobuf circular depenedency . am i good down the way ? will i survive 

### Help tips and NPM commands 3221225781

$ npm i rollup
    - npx rollup -c
    - rollup main.js --format cjs --file bundle.js
$ fix-esm-import-path
$ npm i -g npm
$ npm list -g --depth=0  [--all]
[update all]
$ pnpm update
npx npm-check --global --update-all

### grpc package installation

## Solution I choose,  working fine and deploy

ref:: [https://github.com/badsyntax/grpc-js-typescript/tree/master/examples/grpc-proto-loader]

==== using @grpc/proto-loader
// @grpc/proto-loader (** package.json is root folder )
$ npm ./node_modules/.bin/proto-loader-gen-types --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir=./src/proto/generated ./src/proto/NSaleService.proto

$ pnpm i  @types/node  @grpc/grpc-js @grpc/proto-loader google-protobuf grpc-tools ts-node protobufjs protobufjs-cli 
=====================================================

### typescript

$ npm i -g typescript
$ npx tsc --init

tsc -p tsconfig.json server.ts (  Ctrl+Shift+P on Windows, or ⌘⇧P on macOS. Type Restart TypeScript Server )

**To run the server in debug mode, you can use the following command:
$ node --inspect-brk src/server.ts

**To open the debugger, you can use the following command:
**Once the debugger is open, you can set breakpoints and step through your code line by line.
$ chrome://inspect

**To run the client, you can use the following command:
node src/server/server.ts
node src/client.ts

=====================================================

### below is all tested, but not suceess and never used

=== protoc-gen-grpc

$ npm config set unsafe-perm true
$ npm i -g protoc-gen-grpc
[https://github.com/improbable-eng/ts-protoc-gen]

#### ts-proto

// ts-proto (go to proto folder)
 protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto.cmd --ts_proto_opt=esModuleInterop=true --ts_proto_out=generated/helloworld-ts-proto.ts helloworld.proto

#### generate js codes with @grpc/grpc-js

$ protoc-gen-grpc --js_out=import_style=commonjs,binary:./helloworld2 --grpc_out=grpc_js:./helloworld2 --proto_path . helloworld.proto

#### generate d.ts codes with @grpc/grpc-js

protoc-gen-grpc-ts --ts_out=grpc_js:./helloworld2 --proto_path . helloworld.proto

#### protobuf javascript

ok okk with type definition. how about grpc ?
$> pbjs -t static-module -w commonjs -o compiled.js helloworld.proto
$> pbts -o compiled.d.ts compiled.js

#### protoc - google official

( plugin for generating grpc interfaces in TypeScript.)
[https://github.com/stultuss/protoc-gen-grpc-ts]

[https://github.com/protobufjs/protobuf.js]
protoc -I src/proto --proto_path=src/proto --js_out=import_style=commonjs,binary:src/proto/generated helloworld.proto

[https://github.com/join-com/protoc-gen-ts] google official
protoc --plugin="protoc-gen-tsx" --ts_out=generated helloworld.proto

// add below line to generated grpc interface 
 [name: string]: grpc.UntypedHandleCall;


[https://github.com/thesayyn/protoc-gen-ts]
** working fine to generate ts  , don't known how to use generated file

protoc --proto_path="proto" -I=./proto --ts_out=./proto/generated ./proto/*.proto 

// protoc src/protoc-gen-ts-helloworld/helloworld.proto --proto_path=src/protoc-gen-ts-helloworld/ --plugin=protoc-gen-ts=".\node_modules\.bin\protoc-gen-ts.CMD" --ts_out=service=grpc-node,target=node:./src/protoc-gen-ts-helloworld/generated --js_out=import_style=commonjs,binary:./src/protoc-gen-ts-helloworld/generated 

// --ts_out=service=grpc-node,target=web:.


protoc -I . --proto_path=. --js_out=import_style=commonjs,binary:generated helloworld.proto
protoc -I . --proto_path=. --ts_out=generated helloworld.proto
protoc -I . --plugin="protoc-gen-tsx"  --ts_out=. helloworld.proto

protoc src/proto/*.proto -I src/proto   --ts_out=src/proto/generated

protoc -I=src/proto --proto_path=src/proto --ts_out=src/proto/generated --ts_proto_opt=fileSuffix=_pb helloworld.proto

// protoc -I src/proto --proto_path=src/proto --js_out=import_style=commonjs,binary:src/proto/generated helloworld.proto
// protoc -I . --ts_out=src/proto/generated helloworld.proto
