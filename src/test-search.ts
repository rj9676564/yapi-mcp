
import { YApiService } from "./services/yapi/api";
import { config } from "dotenv";

config();

async function test() {
  const baseUrl = "http://yapi.juhesaas.com:3000";
  const token = "123:6f7ebf06b3256ff8b39504f9988453dbb55a7ca60c13bb884f747a8b432ee5b1,148:9090b34f6e8545dc9d58fd1cacde877135ef0729f27819d72821e38d637912bf";
  
  const service = new YApiService(baseUrl, token, "debug");
  
  console.log("Starting search...");
  try {
    const results = await service.searchApisByPath({
      pathKeyword: "/platform/activity/save",
      projectKeyword: "Boss管理端"
    });
    console.log("Results found:", results.total);
  } catch (error) {
    console.error("Caught error:", error);
  }
}

test();
