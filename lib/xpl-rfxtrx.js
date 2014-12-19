var rfxcom = require('rfxcom');
var Xpl = require('xpl-api');

function wt(device, options) {
	options = options || {};
	this._options = options;
	this.hash = [];

	this.rfxtrx = new rfxcom.RfxCom(device, {
		debug: options.rfxtrxDebug
	});

	options.xplSource = options.xplSource || "bnz-rfxtrx.wiseflat";

	this.xpl = new Xpl(options);
}

module.exports = wt;

var proto = {
    
        init: function(callback) {
                var self = this;

                this.rfxtrx.initialise(function(error) {
                        if (error) {
                                return callback(error);
                        }
                        console.log("RFXTRX device initialised");

                        self.xpl.bind(function(error) {
                                if (error) {
                                        return callback(error);
                                }

                                console.log("XPL is ready");

                                callback(null, self.rfxtrx, self.xpl);
                        });
                });
        },
    

        _send: function(trigMode, body, bodyName, callback) {
                var func=(trigMode)?this.xpl.sendXplTrig:this.xpl.sendXplStat;

                func.call(this.xpl, body, bodyName, callback);
        },

        xplSend_elec: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            count: evt.count,
                            currentWatts: evt.currentWatts,
                            totalWatts: evt.totalWatts
                        }, null, callback);
        },

        xplSend_lighting1: function(evt, trigMode, callback) {
                var subtype = {
                        'x10.basic': 0,
                        'arc.basic': 1,
                        'elro.basic': 2,
                        'waveman.basic': 3,
                        'chacon.basic': 4,
                        'impuls.basic': 5,
                        'risingsun.basic': 6,
                        'philipssbc.basic': 7
                };

                this._send(trigMode, {
                            device: evt.id,
                            subtype: evt.subtype,
                            housecode: evt.housecode,
                            unitcode: evt.unitcode,
                            command: evt.command,
                            rssi: evt.rssi
                        }, subtype[evt.subtype], callback
                );

        },

        xplSend_lighting2: function(evt, trigMode, callback) {
                var subtype = {
                        'ac.basic': 0,
                        'homeeasy.basic': 1,
                        'anslut.basic': 2
                };

                this._send(trigMode, {
                            device: evt.id,
                            unitcode: evt.unitcode,
                            command: evt.command,
                            level: evt.level,
                            rssi: evt.rssi
                        }, subtype[evt.subtype], callback
                );
        },

        xplSend_lighting5: function(evt, trigMode, callback) {
                var subtype = {
                        'lightwaverf.basic': 0,
                        'emw100.basic': 1,
                        'bbbsb.basic': 2
                };

                this._send(trigMode, {
                            device: evt.id,
                            subtype: evt.subtype,
                            unitcode: evt.unitcode,
                            command: evt.command
                        }, subtype[evt.subtype], callback
                );
        },

        xplSend_security1: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            subtype: evt.subtype,
                            deviceStatus: evt.deviceStatus,
                            batteryLevel: evt.batteryLevel,
                            rssi: evt.rssi,
                            tampered: evt.tampered
                        }, 'x10.security', callback
                );            
        },

        xplSend_rfxmeter: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            counter: evt.counter
                        }, callback
                );
        },

        xplSend_weight: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            weight: evt.weight,
                            batteryLevel: evt.batteryLevel,
                            rssi: evt.rssi
                        }, callback
                );
        },

        xplSend_rfxsensor: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            subtype: evt.subtype,
                            message: evt.message,
                            rssi: evt.rssi
                        }, callback
                );
        },

        xplSend_th_forecast: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            subtype: evt.subtype,
                            type: 'forecast',
                            current: evt.temperature
                        }, callback
                );
        },

        xplSend_th_barometer: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            subtype: evt.subtype,
                            type: 'barometer',
                            current: evt.temperature
                        }, callback
                );
        },

        xplSend_th_temp: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            subtype: evt.subtype,
                            type: 'temp',
                            current: evt.temperature
                        }, callback
                );
        },


        xplSend_th_humidity: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            subtype: evt.subtype,
                            type: 'humidity',
                            current: evt.humidity
                        }, callback
                );
        },

        xplSend_th_humidityStatus: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            subtype: evt.subtype,
                            type: 'humidityStatus',
                            current: evt.humidityStatus
                        }, callback
                );
        },

        xplSend_th_battery: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            subtype: evt.subtype,
                            type: 'battery',
                            current: evt.batteryLevel
                        }, callback
                );
        },

        xplSend_th_rssi: function(evt, trigMode, callback) {
                this._send(trigMode, {
                            device: evt.id,
                            subtype: evt.subtype,
                            type: 'rssi',
                            current: evt.rssi
                        }, callback
                );
        }
}

for ( var m in proto) {
	wt.prototype[m] = proto[m];
}
