# react-native-mnemonic

This library provides `RNMnemonicKey`, a native Android and iOS implementation based on Terra.js's `MnemonicKey`, made available for React Native. This significantly improves performance and compatibility in mobile apps.

## Installation

Install to your React Native app's `package.json`:

```sh
$ npm i react-native-mnemonic
```

### Android Setup

You may need to set `multiDexEnabled true` in your Android app's `build.gradle`:

```groovy
// android/app/build.gradle
android {
    ...
    defaultConfig {
        applicationId "com.example.reactnativemnemonickey"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
        multiDexEnabled true // ADD THIS LINE
    }
}
```

### Adding to iOS

You may need to modify your iOS app's `Podfile` to enable Modular Headers for `TrezorCrypto`.

```ruby
require_relative '../node_modules/react-native/scripts/react_native_pods'
require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'

platform :ios, '11.0'

target 'Demo' do
  config = use_native_modules!

  pod 'TrezorCrypto', :modular_headers => true # ADD THIS LINE

  use_react_native!(
    :path => config[:reactNativePath],
    # to enable hermes on iOS, change 'false' to 'true' and then install pods
    :hermes_enabled => true
  )
```

Then run in your React Native iOS app's `ios/` directory:

```sh
$ pod install
```

## Usage

```tsx
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RNMnemonicKey } from 'react-native-mnemonic';

export default function App() {
  const [result, setResult] = React.useState<RNMnemonicKey | undefined>();

  React.useEffect(() => {
    RNMnemonicKey.create({
      mnemonic:
        'satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn',
      coinType: 0,
      account: 0,
      index: 1,
    }).then((privKey) => {
      console.log(privKey) // Log the generated privkey to console, usable with bitcoinjs
    });
  }, []);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
```

## License

This software is licensed under the MIT license. See [LICENSE](LICENSE) for full disclosure.

© 2021 Terraform Labs, PTE.

© 2021 Blockworks B.V., The Netherlands.
