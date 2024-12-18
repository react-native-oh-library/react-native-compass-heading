/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved
 * Use of this source code is governed by a MIT license that can be
 * found in the LICENSE file.
 */

import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import { TM } from '@rnoh/react-native-openharmony/generated/ts';
import { sensor } from '@kit.SensorServiceKit';
import { BusinessError } from '@kit.BasicServicesKit';

interface params {
  heading: number,
  accuracy: number
}

export class RNCompassHeadingTurboModule extends TurboModule implements TM.CompassHeading.Spec {
  constructor(ctx) {
    super(ctx);
    this.ctx.rnInstance.emitDeviceEvent('HeadingUpdated', this.params)
  }

  params = {
    heading: 0,
    accuracy: 1
  }

  start(filter: number, callback?: (params: params) => void) {
    sensor.on(sensor.SensorId.ORIENTATION, (data: sensor.OrientationResponse) => {
      if (Math.abs(this.params.heading - Math.floor(data.alpha)) > filter - 1) {
        this.params.heading = Math.floor(data.alpha)
        this.params.accuracy = sensor.getSingleSensorSync(sensor.SensorId.ORIENTATION).precision
        this.sendEvent('HeadingUpdated', this.params)
      }
    })
  }

  sendEvent(eventName: string, payload: any) {
    this.ctx.rnInstance.emitDeviceEvent(eventName, payload)
  }

  stop(): void {
    sensor.off(sensor.SensorId.ORIENTATION);
  }
}