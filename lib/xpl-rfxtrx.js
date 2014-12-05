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

wt.prototype.trig_elec = function(evt) {
	var self = this;
	self.xpl.sendXplTrig({
		device: evt.id,
		count: evt.count,
		currentWatts: evt.currentWatts,
		totalWatts: evt.totalWatts
	});
};

wt.prototype.trig_lighting1 = function(evt) {
	var self = this;
	self.xpl.sendXplTrig({
		device: evt.id,
		subtype: evt.subtype,
		housecode: evt.housecode,
		unitcode: evt.unitcode,
		command: evt.command,
		rssi: evt.rssi
	}, 'x10.basic');
};

wt.prototype.stat_lighting1 = function(evt) {
	var self = this;
	self.xpl.sendXplStat({
		device: evt.id,
		subtype: evt.subtype,
		housecode: evt.housecode,
		unitcode: evt.unitcode,
		command: evt.command,
		rssi: evt.rssi
	}, 'x10.basic');
};

wt.prototype.trig_lighting2 = function(evt) {
	var self = this;
	self.xpl.sendXplTrig({
		device: evt.id,
		unitcode: evt.unitcode,
		command: evt.command,
		level: evt.level,
		rssi: evt.rssi
	}, 'homeeasy.basic');
};

wt.prototype.stat_lighting2 = function(evt) {
	var self = this;
	self.xpl.sendXplStat({
		device: evt.id,
		unitcode: evt.unitcode,
		command: evt.command,
		level: evt.level,
		rssi: evt.rssi
	}, 'homeeasy.basic');
};

wt.prototype.trig_lighting5 = function(evt) {
	var self = this;
	self.xpl.sendXplTrig({
		device: evt.id,
		subtype: evt.subtype,
		unitcode: evt.unitcode,
		command: evt.command
	}, 'Lightwaverf.basic');
};

wt.prototype.stat_lighting5 = function(evt) {
	var self = this;
	self.xpl.sendXplStat({
		device: evt.id,
		subtype: evt.subtype,
		unitcode: evt.unitcode,
		command: evt.command
	}, 'Lightwaverf.basic');
};

wt.prototype.trig_security1 = function(evt) {
	var self = this;
	self.xpl.sendXplTrig({
		device: evt.id,
		subtype: evt.subtype,
		deviceStatus: evt.deviceStatus,
		batteryLevel: evt.batteryLevel,
		rssi: evt.rssi,
		tampered: evt.tampered
	}, 'x10.security');
};

wt.prototype.stat_security1 = function(evt) {
	var self = this;
	self.xpl.sendXplStat({
		device: evt.id,
		subtype: evt.subtype,
		deviceStatus: evt.deviceStatus,
		batteryLevel: evt.batteryLevel,
		rssi: evt.rssi,
		tampered: evt.tampered
	}, 'x10.security');
};

wt.prototype.trig_rfxmeter = function(evt) {
	var self = this;
	self.xpl.sendXplTrig({
		device: evt.id,
		counter: evt.counter
	});
};

wt.prototype.stat_rfxmeter = function(evt) {
	var self = this;
	self.xpl.sendXplStat({
		device: evt.id,
		counter: evt.counter
	});
};

wt.prototype.trig_weight = function(evt) {
	var self = this;
	self.xpl.sendXplTrig({
		device: evt.id,
		weight: evt.weight,
		batteryLevel: evt.batteryLevel,
		rssi: evt.rssi
	});
};

wt.prototype.stat_weight = function(evt) {
	var self = this;
	self.xpl.sendXplStat({
		device: evt.id,
		weight: evt.weight,
		batteryLevel: evt.batteryLevel,
		rssi: evt.rssi
	});
};

wt.prototype.trig_rfxsensor = function(evt) {
	var self = this;
	self.xpl.sendXplTrig({
		device: evt.id,
		subtype: evt.subtype,
		message: evt.message,
		rssi: evt.rssi
	});
};

wt.prototype.stat_rfxsensor = function(evt) {
	var self = this;
	self.xpl.sendXplStat({
		device: evt.id,
		subtype: evt.subtype,
		message: evt.message,
		rssi: evt.rssi
	});
};

wt.prototype.trig_th_forecast = function(evt) {
	var self = this;
	self.xpl.sendXplTrig({
		device: evt.id,
		subtype: evt.subtype,
		type: 'forecast',
		current: evt.temperature
	});
};

wt.prototype.stat_th_forecast = function(evt) {
	var self = this;
	self.xpl.sendXplStat({
		device: evt.id,
		subtype: evt.subtype,
		type: 'forecast',
		current: evt.temperature
	});
};

wt.prototype.trig_th_barometer = function(evt) {
	var self = this;
	self.xpl.sendXplTrig({
		device: evt.id,
		subtype: evt.subtype,
		type: 'barometer',
		current: evt.temperature
	});
};

wt.prototype.stat_th_barometer = function(evt) {
	var self = this;
	self.xpl.sendXplStat({
		device: evt.id,
		subtype: evt.subtype,
		type: 'barometer',
		current: evt.temperature
	});
};

wt.prototype.trig_th_temperature = function(evt) {
	var self = this;
	self.xpl.sendXplTrig({
		device: evt.id,
		subtype: evt.subtype,
		type: 'temp',
		current: evt.temperature
	});
};

wt.prototype.stat_th_temperature = function(evt) {
	var self = this;
	self.xpl.sendXplStat({
		device: evt.id,
		subtype: evt.subtype,
		type: 'temp',
		current: evt.temperature
	});
};

wt.prototype.trig_th_humidity = function(evt) {
	var self = this;
	self.xpl.sendXplTrig({
		device: evt.id,
		subtype: evt.subtype,
		type: 'humidity',
		current: evt.humidity
	});
};

wt.prototype.stat_th_humidity = function(evt) {
	var self = this;
	self.xpl.sendXplStat({
		device: evt.id,
		subtype: evt.subtype,
		type: 'humidity',
		current: evt.humidity
	});
};

wt.prototype.trig_th_humidityStatus = function(evt) {
	var self = this;
	self.xpl.sendXplTrig({
		device: evt.id,
		subtype: evt.subtype,
		type: 'humidityStatus',
		current: evt.humidityStatus
	});
};

wt.prototype.stat_th_humidityStatus = function(evt) {
	var self = this;
	self.xpl.sendXplStat({
		device: evt.id,
		subtype: evt.subtype,
		type: 'humidityStatus',
		current: evt.humidityStatus
	});
};

wt.prototype.trig_th_batteryLevel = function(evt) {
	var self = this;
	self.xpl.sendXplTrig({
		device: evt.id,
		subtype: evt.subtype,
		type: 'battery',
		current: evt.batteryLevel
	});
};

wt.prototype.stat_th_batteryLevel = function(evt) {
	var self = this;
	self.xpl.sendXplStat({
		device: evt.id,
		subtype: evt.subtype,
		type: 'battery',
		current: evt.batteryLevel
	});
};

wt.prototype.trig_th_rssi = function(evt) {
	var self = this;
	self.xpl.sendXplTrig({
		device: evt.id,
		subtype: evt.subtype,
		type: 'rssi',
		current: evt.rssi
	});
};

wt.prototype.stat_th_rssi = function(evt) {
	var self = this;
	self.xpl.sendXplStat({
		device: evt.id,
		subtype: evt.subtype,
		type: 'rssi',
		current: evt.rssi
	});
};