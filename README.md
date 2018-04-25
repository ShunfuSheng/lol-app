# lol-app

An application that imitate to a League of Legends app and it is only create by react-native + dva

## 运行项目

```bash
yarn # 或者 npm install
react-native run-ios # 或者 react-native run-android
```

## 常见问题

运行run-android进行编译的时候可能会由于文件名的更改而与之前编译过的文件发生冲突，导致编译失败。出现这种问题只需要将之前的编译输出文件清掉即可，解决方法：
1. cd android/
2. ./gradlew clean
3. cd ..
4. react-native run-android

## 项目简介

项目是一个模仿掌上英雄联盟的app，使用**react-native + dva + react-navigation**集成开发，项目的初始化借由[react-native-dva-starter](https://github.com/nihgwu/react-native-dva-starter "了解一下")这个开源项目完成，通过dva进行状态的全局管理以及开发的模式，路由方面交由react navigation控制，目前暂时未融入任何UI框架，仅供技术参考！

## LICENSE

MIT
