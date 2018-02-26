const { expect } = require('chai');
require('mocha');
const { timeFormat, strFormat, boolFormat } = require('../hive-gamemodes-config');

describe("hive-gamemodes-config.js", () => {
  describe("#timeFormat()", () => {
    it("1 seconds", () => {
      expect(timeFormat(1)).to.eql('1s');
    });
    it("32 seconds", () => {
      expect(timeFormat(32)).to.eql('32s');
    });
    it("60 seconds", () => {
      expect(timeFormat(60)).to.eql('1m 0s');
    });
    it("62 seconds", () => {
      expect(timeFormat(62)).to.eql('1m 2s');
    });
    it("12345 seconds", () => {
      expect(timeFormat(12345)).to.eql('3h 25m 45s');
    });
    it("86400 seconds", () => {
      expect(timeFormat(86400)).to.eql('1d 0h 0m 0s');
    });
    it("345678 seconds", () => {
      expect(timeFormat(345678)).to.eql('4d 0h 1m 18s');
    });
    it("12345678 seconds", () => {
      expect(timeFormat(12345678)).to.eql('142d 21h 21m 18s');
    });
    it("0 seconds", () => {
      expect(timeFormat(0)).to.eql('0s');
    });
    it("-1 seconds", () => {
      expect(timeFormat(-1)).to.eql('unknown');
    });
    it("-1123882 seconds", () => {
      expect(timeFormat(-1)).to.eql('unknown');
    });
    it("undefined", () => {
      expect(timeFormat(undefined)).to.eql('unknown');
    });
    it("null", () => {
      expect(timeFormat(null)).to.eql('unknown');
    });
  });

  describe("#strFormat()", () => {
    it("hello", () => {
      expect(strFormat("hello")).to.eql('Hello');
    });
    it("HELLO", () => {
      expect(strFormat("HELLO")).to.eql('Hello');
    });
    it("HEllO", () => {
      expect(strFormat("HEllO")).to.eql('Hello');
    });
    it("Hello World", () => {
      expect(strFormat("Hello World")).to.eql('Hello World');
    });
    it("hello world", () => {
      expect(strFormat("hello world")).to.eql('Hello World');
    });
    it("123", () => {
      expect(strFormat("123")).to.eql('123');
    });
    it("empty string", () => {
      expect(strFormat("")).to.eql('');
    });
    it("undefined", () => {
      expect(strFormat(undefined)).to.eql('');
    });
    it("null", () => {
      expect(strFormat(null)).to.eql('');
    });
  })

  describe("#boolFormat()", () => {
    it("true", () => {
      expect(boolFormat(true)).to.eql('True');
    });
    it("false", () => {
      expect(boolFormat(false)).to.eql("False");
    });
    it("random input", () => {
      expect(boolFormat("random input")).to.eql('Random Input');
    });
    it("undefined", () => {
      expect(boolFormat(undefined)).to.eql('False');
    });
    it("null", () => {
      expect(boolFormat(null)).to.eql('False');
    });
  })
});
