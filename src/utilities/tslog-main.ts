import { Logger } from "tslog";

// export was host here to share same parent between main and child log
// export const dps_logger: Logger<ILogObj> = new Logger({ type: "pretty", name: "dps2n3_log", minLevel: 1 });

// Create a logger with the custom template
export const dps_logger = new Logger({
   type: "pretty",
   name: "dps2n3_log",
   minLevel: 1,
   prettyLogTemplate:"{{logLevelName}} :",
   prettyErrorTemplate: "\n{{errorName}} {{errorMessage}}\nerror stack:\n{{errorStack}}",
   prettyErrorStackTemplate: "  • {{fileName}}\t{{method}}\n\t{{filePathWithLine}}",
   prettyErrorParentNamesSeparator: ":",
   prettyErrorLoggerNameDelimiter: "\t",
   stylePrettyLogs: true,
   prettyLogStyles:{
    logLevelName: {
      "*": ["bold", "black", "bgWhiteBright", "dim"],
      SILLY: ["bold", "white"],
      TRACE: ["bold", "whiteBright"],
      DEBUG: ["bold", "green"],
      INFO: ["bold", "blue"],
      WARN: ["bold", "yellow"],
      ERROR: ["bold", "red"],
      FATAL: ["bold", "redBright"],
    },
    dateIsoStr: "white",
    filePathWithLine: "white",
    name: ["white", "bold"],
    nameWithDelimiterPrefix: ["white", "bold"],
    nameWithDelimiterSuffix: ["white", "bold"],
    errorName: ["bold", "bgRedBright", "whiteBright"],
    fileName: ["yellow"],
   }
});
