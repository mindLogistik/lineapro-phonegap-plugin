var argscheck = require('cordova/argscheck'),
    channel = require('cordova/channel'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    cordova = require('cordova');

 function LineaProCDV() {
    this.results = [];
    this.connCallback = null;
    this.errorCallback = null;
    this.cardDataCallback = null;
    this.barcodeCallback = null;
    this.buttonPressCallback = null;
}

LineaProCDV.prototype.initDT = function(connectionCallback, cardCallback, barcCallback, buttonPressCallback, errorCallback) {
    this.results = [];
    this.connCallback = connectionCallback;
    this.cardDataCallback = cardCallback;
    this.barcodeCallback = barcCallback;
    this.buttonPressCallback = buttonPressCallback;
    exec(null, errorCallback, "LineaProCDV", "initDT", []);
    //alert("LineaProCDV");
};

LineaProCDV.prototype.barcodeStart = function() {
    exec(null, null, "LineaProCDV", "startBarcode", []);
};

LineaProCDV.prototype.barcodeStop = function() {
    exec(null, null, "LineaProCDV", "stopBarcode", []);
};

LineaProCDV.prototype.configureMode = function() {
    exec(null, null, "LineaProCDV", "configureMode", []);
};

LineaProCDV.prototype.connectionChanged = function(state) {
    this.connCallback(state);
};

LineaProCDV.prototype.onMagneticCardData = function(track1, track2, track3) {
    this.cardDataCallback(track1 + track2 + track3);
    this.barcodeStart();
};

LineaProCDV.prototype.onBarcodeData = function(rawCodesArr, scanId, dob, state, city, expires, gender, height, weight, hair, eye, firstName, lastName) {
    var data = {
               rawCodesArr: rawCodesArr,
               scanId: scanId,
               dob: dob,
               state: state,
               city: city,
               expires: expires,
               gender: gender,
               height: height,
               weight: weight,
               hair: hair,
               eye: eye,
               firstName: firstName,
               lastName: lastName
               };
    this.barcodeCallback(data);
};

LineaProCDV.prototype.playSound = function(volume, beepDataArray) {
    exec(null, null, "LineaProCDV", "playSound", [parseInt(volume), beepDataArray || []]);
};

LineaProCDV.prototype.barcodeSetScanBeep = function(enabled, volume, beepDataArray) {
    exec(null, null, "LineaProCDV", "barcodeSetScanBeep", [(enabled === true), parseInt(volume), beepDataArray || []]);
};

LineaProCDV.prototype.onDeviceButtonPressed = function(which) {
    this.buttonPressCallback({which: which});
};


module.exports = new LineaProCDV();
