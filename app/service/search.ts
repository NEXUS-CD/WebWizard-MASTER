import { Service } from "egg";
import * as _ from "lodash";

/**
 * Test Service
 */
export default class Search extends Service {
  /**
   * 搜索
   * @param searchCon - 搜索内容
   */
  async searchMsg(searchCon) {
    const res = await this.ctx.curl(
      `http://10.8.250.58:40381/ZIwTuwmXcBWjYhyCdTlo/search/?${searchCon}`,
      {
        method: "GET",
        dataType: "json",
      }
    );
    console.log(555, res);

    return res.data;
  }

  /**
   * 批量搜索
   * @param searchCon - 搜索内容
   */
  async searchMore() {
    const res = await this.ctx.curl(
      `http://10.8.250.58:40381/gsAGtrNVRleiOtjVWpIRilQcZOPAFYAMQyTNpVfc/export/`,
      {
        method: "GET",
        dataType: "json",
      }
    );
    return res.data;
  }
}
