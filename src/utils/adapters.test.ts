import { ab2str, str2ab } from "./adapters";

describe("arraybuffer / string transformation verification", () => {
  it("should work from arraybuffer to string", () => {
    // encode reference: https://www.ascii-code.com/
    const ab = new ArrayBuffer(3);
    const abView = new Uint8Array(ab);
    abView[0] = 65; // A
    abView[1] = 66; // B
    abView[2] = 67; // C
    const result = ab2str(ab);
    expect(result).toBe("ABC");
  });
  it("should work from string arraybuffer", () => {
    const ab = new ArrayBuffer(3);
    const abView = new Uint8Array(ab);
    abView[0] = 65; // A
    abView[1] = 66; // B
    abView[2] = 67; // C
    const result = str2ab("ABC");
    expect(result).toStrictEqual(ab);
  });
  it("should be the same when going from string and back to string", () => {
    const input = "secure-share-app!";
    const ab = str2ab(input);
    const result = ab2str(ab);
    expect(input).toBe(result);
  });
});
describe("base64 transformation verification", () => {
  it("atob test", () => {
    const base64 = atob("eHh4eA==");
    expect(base64).toBe("xxxx");
  });
  it("btoa test", () => {
    const base64 = btoa("xxxx");
    expect(base64).toBe("eHh4eA==");
  });
});
