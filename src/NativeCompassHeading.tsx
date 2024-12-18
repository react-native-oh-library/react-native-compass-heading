/*
 * Copyright (c) 2024 Huawei Device Co., Ltd. All rights reserved
 * Use of this source code is governed by a MIT license that can be
 * found in the LICENSE file.
 */

import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

interface CompassData {
    heading: number;
    accuracy: number;
  }

type CompassCallback = (data: CompassData) => void;

export interface Spec extends TurboModule {
    start(filter:number,callback: CompassCallback):void
    stop():void
}
export default TurboModuleRegistry.getEnforcing<Spec>('CompassHeading');