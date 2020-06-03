import DeviceInfo from 'react-native-device-info'

export async function getDeviceInfo() {
  return {
    packageName: DeviceInfo.getBundleId(),
    appVersion: DeviceInfo.getVersion(),
    uniqueId: DeviceInfo.getUniqueId(),
  }
}
