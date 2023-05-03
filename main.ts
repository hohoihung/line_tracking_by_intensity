input.onButtonPressed(Button.A, function () {
    _demo = 1
})
function proportional_algorithm () {
    _pin0 = pins.analogReadPin(AnalogPin.P0)
    if (_pin0 <= _min_intensity) {
        _pin0 = _min_intensity
    } else if (_pin0 >= _max_intensity) {
        _pin0 = _max_intensity
    }
    _intensity = pins.map(
    _pin0,
    _min_intensity,
    _max_intensity,
    0,
    100
    )
    _error = _gain * (_intensity - 50)
    _outside_speed = _base_speed + _error
    _inside_speed = 0 - (_base_speed - _error)
    wuKong.setAllMotor(_inside_speed, _outside_speed)
}
function _5state_algorithm () {
    _pin0 = pins.analogReadPin(AnalogPin.P0)
    if (_pin0 <= _min_intensity) {
        _pin0 = _min_intensity
    } else if (_pin0 >= _max_intensity) {
        _pin0 = _max_intensity
    }
    _intensity = pins.map(
    _pin0,
    _min_intensity,
    _max_intensity,
    0,
    100
    )
    if (_intensity > 90) {
        wuKong.setAllMotor(0 - _base_speed, 0 - _base_speed)
    } else if (_intensity > 60) {
        wuKong.setAllMotor(0, _base_speed)
    } else if (_intensity > 40) {
        wuKong.setAllMotor(0 - _base_speed, _base_speed)
    } else if (_intensity > 10) {
        wuKong.setAllMotor(0 - _base_speed, 0)
    } else {
        wuKong.setAllMotor(_base_speed, _base_speed)
    }
}
input.onButtonPressed(Button.B, function () {
    _demo = 2
})
let _pin0 = 0
let _demo = 0
let _error = 0
let _outside_speed = 0
let _inside_speed = 0
let _base_speed = 0
let _gain = 0
let _min_intensity = 0
let _max_intensity = 0
let _intensity = 0
pins.setPull(DigitalPin.P0, PinPullMode.PullNone)
_intensity = 0
_max_intensity = 25
_min_intensity = 56
_gain = 1.25
_base_speed = 90
_inside_speed = 0 - _base_speed
_outside_speed = _base_speed
_error = 100
_demo = 0
wuKong.stopAllMotor()
basic.showIcon(IconNames.Happy)
basic.forever(function () {
    while (_demo == 1) {
        _5state_algorithm()
    }
    while (_demo == 2) {
        proportional_algorithm()
    }
})
