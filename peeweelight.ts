/**
 * PeeWeeLight
 */
//% weight=100 color=#0fbc11 icon="\ue0b7"
namespace PeeWeeLight {
    type WheelCmd = {
        EN: number;
        IN1: number;
        IN2: number;
    }

    type Pinout = {
        ENr: AnalogPin;
        ENl: AnalogPin;
        IN1r: DigitalPin;
        IN2r: DigitalPin;
        IN1l: DigitalPin;
        IN2l: DigitalPin;
    }

    const pinout: Pinout = {
        ENr: AnalogPin.P1,
        ENl: AnalogPin.P2,
        IN1r: DigitalPin.P12,
        IN2r: DigitalPin.P13,
        IN1l: DigitalPin.P14,
        IN2l: DigitalPin.P15
    }

    function wheelCmd(speed: number): WheelCmd {
        const s = Math.max(-100, Math.min(100, speed))
        if (s === 0) {
            return {
                EN: 0,
                IN1: 0,
                IN2: 0
            }
        }
        const en = Math.idiv(Math.abs(s) * 1023, 100)
        if (s > 0) {
            return {
                EN: en,
                IN1: 0,
                IN2: 1
            }
        } else {
            return {
                EN: en,
                IN1: 1,
                IN2: 0
            }
        }
    }

    export function wheelSpeed(left: number = 0, right: number = 0) {
        //right
        let cmd = wheelCmd(right)
        pins.analogWritePin(pinout.ENr, cmd.EN)
        pins.digitalWritePin(pinout.IN1r, cmd.IN1)
        pins.digitalWritePin(pinout.IN2r, cmd.IN2)
        //left
        cmd = wheelCmd(left)
        pins.analogWritePin(pinout.ENl, cmd.EN)
        pins.digitalWritePin(pinout.IN1l, cmd.IN1)
        pins.digitalWritePin(pinout.IN2l, cmd.IN2)
    }

    export function wheelStop() {
        wheelSpeed(0, 0)
    }

    export function wheelBreak() {
        //right
        pins.analogWritePin(pinout.ENr, 1)
        pins.digitalWritePin(pinout.IN1r, 0)
        pins.digitalWritePin(pinout.IN2r, 0)
        //left
        pins.analogWritePin(pinout.ENl, 1)
        pins.digitalWritePin(pinout.IN1l, 0)
        pins.digitalWritePin(pinout.IN2l, 0)
    }
    
}
