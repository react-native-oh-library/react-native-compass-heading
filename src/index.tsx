import { NativeModules, NativeEventEmitter, Platform,TurboModuleRegistry } from 'react-native';

var CompassHeadings = TurboModuleRegistry ? TurboModuleRegistry.get('CompassHeading') : NativeModules.CompassHeading;
let listener: { remove: () => any } | null;
let _start = CompassHeadings.start;
let _stop = CompassHeadings.stop;

type dataType = {
  heading: number;
  accuracy: number;
};

const CompassHeading = {
   async start(filter:number,callback: (data: dataType) => void){
    if (listener) {
       await CompassHeading.stop();
    }
    const compassEventEmitter = new NativeEventEmitter(CompassHeadings)
    listener = compassEventEmitter.addListener(
          'HeadingUpdated',
          (data: dataType) => {
                  callback(data);
                }
        );
        return await _start(filter === null ? 0 : filter)
  },

  async stop(){
  listener && listener.remove();
  listener = null;
  await _stop();
  }
}

export default CompassHeading;
