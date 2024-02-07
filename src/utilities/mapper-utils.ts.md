#

```ts
import { createMapper } from 'automapper-core';
import { classes  } from 'automapper-classes';

import { NSaleMsg } from "../proto/generated/Dps2n3Grpc/NSaleMsg.js";
import { SaleNumberEntity } from "../type_orm/entity/NSale.entity.js";

// Create a mapping configuration
const mappingConfig = createMapper({
   name: "NSaleServiceMapping",
   pluginInitializer: classes() 
});

autoMapper.createMap(NSaleMsg, SaleNumberEntity, mappingConfig);

// usage
// var saleEntity = autoMapper.map(NSaleMsg,SaleNumberEntity, "".."");


// Export constants
/** .map( source , dest , obj ); */
export const AutoMapperInstance = autoMapper;
export const MappingConfigInstance = mappingConfig;



// // Define source and destination classes
// class Source {
//    constructor(public id: number, public name: string) {}
// }

// class Destination {
//    constructor(public identifier: number, public title: string) {}
// }

// // Register the mapping
// autoMapper.createMap(Source, Destination, mappingConfig);

// // Create an instance of the source class
// const sourceInstance = new Source(1, "SourceName");

// // Use AutoMapper to map the source instance to the destination
// const destinationInstance = autoMapper.map(Source, Destination, sourceInstance);

// // Output the result
// console.log(destinationInstance);
```