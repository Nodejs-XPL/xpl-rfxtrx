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

wt.prototype.init = function(callback) {
	var self = this;

	this.rfxtrx.initialise(function(error) {
		if (error) {
			return callback(error);
		}
		console.log("RFXTRX device initialised");

		//self.rfxtrx.on("ready", function(evt) {
		//	console.log("RFXTRX device is ready");

			self.xpl.bind(function(error) {
				if (error) {
					return callback(error);
				}

				console.log("XPL is ready");

				callback(null, self.rfxtrx, self.xpl);
			});
		//});
	});
}

module.exports = wt;

wt.prototype._send = function(trigMode, body, bodyName, callback) {
	var func=(trigMode)?this.xpl.sendXplTrig:this.xpl.sendXplStat;
	
	func.call(this.xpl, body, bodyName, callback);
};

wt.prototype.xplSend_elec = function(evt, trigMode, callback) {
	this._send(trigMode, {
                    device: evt.id,
                    count: evt.count,
                    currentWatts: evt.currentWatts,
                    totalWatts: evt.totalWatts
                }, null, callback);
};

wt.prototype.xplSend_lighting1 = function(evt, trigMode, callback) {
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
                }, subtype[evt.subtype], callback);
        );
};

wt.prototype.xplSend_lighting2 = function(evt, mode) {
	var self = this;
        var subtype = {
                'ac.basic': 0,
                'homeeasy.basic': 1,
                'anslut.basic': 2
        };
        
        if (mode) {
                self.xpl.sendXplTrig({
                    device: evt.id,
                    unitcode: evt.unitcode,
                    command: evt.command,
                    level: evt.level,
                    rssi: evt.rssi
                }, subtype[evt.subtype]);         
        }
        else {
                self.xpl.sendXplStat({
                    device: evt.id,
                    unitcode: evt.unitcode,
                    command: evt.command,
                    level: evt.level,
                    rssi: evt.rssi
                }, subtype[evt.subtype]);
        }
};

wt.prototype.xplSend_lighting5 = function(evt, mode) {
	var self = this;
        var subtype = {
                'lightwaverf.basic': 0,
                'emw100.basic': 1,
                'bbbsb.basic': 2
        };
        if (mode) {
                self.xpl.sendXplTrig({
                    device: evt.id,
                    subtype: evt.subtype,
                    unitcode: evt.unitcode,
                    command: evt.command
                }, subtype[evt.subtype]);          
        }
        else {
                self.xpl.sendXplStat({
                    device: evt.id,
                    subtype: evt.subtype,
                    unitcode: evt.unitcode,
                    command: evt.command
                }, subtype[evt.subtype]);       
        }

};

wt.prototype.xplSend_security1 = function(evt, mode) {
	var self = this;
        if (mode) {
                self.xpl.sendXplTrig({
                    device: evt.id,
                    subtype: evt.subtype,
                    deviceStatus: evt.deviceStatus,
                    batteryLevel: evt.batteryLevel,
                    rssi: evt.rssi,
                    tampered: evt.tampered
                }, 'x10.security');
        }
        else {
                self.xpl.sendXplStat({
                    device: evt.id,
                    subtype: evt.subtype,
                    deviceStatus: evt.deviceStatus,
                    batteryLevel: evt.batteryLevel,
                    rssi: evt.rssi,
                    tampered: evt.tampered
                }, 'x10.security');
        }
            
};

wt.prototype.xplSend_rfxmeter = function(evt, mode) {
	var self = this;
        if (mode) {
                self.xpl.sendXplTrig({
                    device: evt.id,
                    counter: evt.counter
                });   
        }
        else {
                self.xpl.sendXplStat({
                    device: evt.id,
                    counter: evt.counter
                }); 
        }
};

wt.prototype.xplSend_weight = function(evt, mode) {
	var self = this;
        if (mode) {
                self.xpl.sendXplTrig({
                    device: evt.id,
                    weight: evt.weight,
                    batteryLevel: evt.batteryLevel,
                    rssi: evt.rssi
                });
        }
        else {
                self.xpl.sendXplStat({
                    device: evt.id,
                    weight: evt.weight,
                    batteryLevel: evt.batteryLevel,
                    rssi: evt.rssi
                });
        }
};

wt.prototype.xplSend_rfxsensor = function(evt, mode) {
	var self = this;
        if (mode) {
                self.xpl.sendXplTrig({
                    device: evt.id,
                    subtype: evt.subtype,
                    message: evt.message,
                    rssi: evt.rssi
                });
        }
        else {
                self.xpl.sendXplStat({
                    device: evt.id,
                    subtype: evt.subtype,
                    message: evt.message,
                    rssi: evt.rssi
                });
        }

};


wt.prototype.xplSend_th_forecast = function(evt, mode) {
	var self = this;
        if (mode) {
                self.xpl.sendXplTrig({
                    device: evt.id,
                    subtype: evt.subtype,
                    type: 'forecast',
                    current: evt.temperature
                });
        }
        else {
                self.xpl.sendXplStat({
                    device: evt.id,
                    subtype: evt.subtype,
                    type: 'forecast',
                    current: evt.temperature
                });
        }

};

wt.prototype.xplSend_th_barometer = function(evt, mode) {
	var self = this;
        if (mode) {
                self.xpl.sendXplTrig({
                    device: evt.id,
                    subtype: evt.subtype,
                    type: 'barometer',
                    current: evt.temperature
                });
        }
        else {
                self.xpl.sendXplStat({
                    device: evt.id,
                    subtype: evt.subtype,
                    type: 'barometer',
                    current: evt.temperature
                });
        }
};

wt.prototype.xplSend_th_temp = function(evt, mode) {
	var self = this;
        if (mode) {
                self.xpl.sendXplTrig({
                    device: evt.id,
                    subtype: evt.subtype,
                    type: 'temp',
                    current: evt.temperature
                });
        }
        else {
                self.xpl.sendXplStat({
                    device: evt.id,
                    subtype: evt.subtype,
                    type: 'temp',
                    current: evt.temperature
                });
        }

};


wt.prototype.xplSend_th_humidity = function(evt, mode) {
	var self = this;
        if (mode) {
                self.xpl.sendXplTrig({
                    device: evt.id,
                    subtype: evt.subtype,
                    type: 'humidity',
                    current: evt.humidity
                });
        }
        else {
                self.xpl.sendXplStat({
                    device: evt.id,
                    subtype: evt.subtype,
                    type: 'humidity',
                    current: evt.humidity
                });
        }
};

wt.prototype.xplSend_th_humidityStatus = function(evt, mode) {
	var self = this;
        if (mode) {
                self.xpl.sendXplTrig({
                    device: evt.id,
                    subtype: evt.subtype,
                    type: 'humidityStatus',
                    current: evt.humidityStatus
                });
        }
        else {
                self.xpl.sendXplStat({
                    device: evt.id,
                    subtype: evt.subtype,
                    type: 'humidityStatus',
                    current: evt.humidityStatus
                });
        }
};

wt.prototype.xplSend_th_battery = function(evt, mode) {
	var self = this;
        if (mode) {
                self.xpl.sendXplTrig({
                    device: evt.id,
                    subtype: evt.subtype,
                    type: 'battery',
                    current: evt.batteryLevel
                });
        }
        else {
                self.xpl.sendXplStat({
                    device: evt.id,
                    subtype: evt.subtype,
                    type: 'battery',
                    current: evt.batteryLevel
                });
        }
};


wt.prototype.xplSend_th_rssi = function(evt, mode) {
	var self = this;
        if (mode) {
                self.xpl.sendXplTrig({
                    device: evt.id,
                    subtype: evt.subtype,
                    type: 'rssi',
                    current: evt.rssi
                });
        }
        else {
                self.xpl.sendXplStat({
                    device: evt.id,
                    subtype: evt.subtype,
                    type: 'rssi',
                    current: evt.rssi
                });
        }
};
