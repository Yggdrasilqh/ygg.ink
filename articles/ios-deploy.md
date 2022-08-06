---
title: "iOS deploy"
excerpt: "In a project, one often develops in different environments. For example, all server requests are to go against the `Dev` server during development, later for testing against the `Staging` server and at the end against the `Prod` server."
# coverImage: "/assets/blog/dynamic-routing/cover.jpg"
date: "2020-03-16T05:35:07.322Z"
author:
  name: yggdrasil
  picture: "/assets/blog/authors/jj.jpeg"
ogImage:
  url: "/assets/blog/dynamic-routing/cover.jpg"
---

# Dev/Staging/Prod Configs in Xcode

In a project, one often develops in different environments. For example, all server requests are to go against the `Dev` server during development, later for testing against the `Staging` server and at the end against the `Prod` server.

Or different test scenarios can be used — e.g., only mocked requests during development and the database should be filled on each app start with prepared test data. For that, you don’t want to change the code all the time. 😫

> Use configuration files to easily exchange environment-dependent data.

This can be done in different ways.

By the way, thank you [Quentin Fasquel](https://medium.com/u/b8653b12a7c4?source=post_page-----ec58b2cc1df4-----------------------------------) for pushing me to a better solution with your [reply](https://medium.com/@quentinfasquel/hi-sven-korset-bb5d2960a616#--responses)! 😊👍

Incidentally, this is an article from the “ [Pieces of a scalable iOS app architecture](https://medium.com/@sven.korset/pieces-of-a-scalable-ios-app-architecture-7c182f9dcd2c) ” series.

This approach uses different project targets to copy the appropriate config file to the bundle. It works, but there are some drawbacks, which will be covered later on. So, if you’re not interested in knowing how to **not** do configurations then please move on to the section titled “New Recommended Approach”. 😉

For this approach, you need to create a couple of targets: a **Dev target** (Development) for normal development, debugging and testing and a **Prod target** (Production), which is needed only to build the final app when going live.

Using multiple targets has the advantage of allowing you to use a different bundle identifier for the Dev builds than for Prod builds because there are then two _info.plist_ files.

Then you can also create two config files. One is only included with the Dev target and the other with the Prod target. No code switch necessary for that! 😁

Config.plist in the Dev target

Config.plist in the Prod target

With a little bit of glue code to interpret command-line arguments, you can then simply switch through different configuration files within the same target, for example to load a _dev_ or a _staging_ config file for debugging.

However, creating a new target only for a different configuration has some drawbacks:

1. The project’s `.pbxproj` file gets doubled in length, and bigger project files might slow down Xcode.
2. Merge conflicts within the project file now need to be solved at more locations.
3. One may forget to add new files to both destinations.

In my opinion, the last point is especially an issue because without CI the problem occurs late. Then it’s tedious to look through all the files to find the forgotten check mark. 😔

As [Piotr Gorzelany](https://medium.com/u/7114b3d7b439?source=post_page-----ec58b2cc1df4-----------------------------------) explains in his article “ [iOS project best practices and tools](https://medium.com/@piotr.gorzelany/ios-project-best-practices-and-tools-c46135b8116d) ”, you can use _project-level configurations_. You then have to edit the _scheme_ to choose in the _Run — Info_ tab of the _Build Configuration_ to either _Debug_, _Release_ or _Staging_.

Depending on the selected configuration, another part of the _Configuration.plist_ file is loaded. The problem is all data for all configurations must be in one file. This means the whole file is delivered into a production build and may possibly contain sensitive development data. 😨

It’d be better if **only the data that are needed are delivered**. And it’d also be better to have a solution where it’s not necessary to modify the scheme all the time. 😩

This approach relies on _.xcconfig_ files, _schemes_ and _Config.plist_ files for each configuration.

## Set up the configurations

In the _project settings_ under _Info_ — _Configurations,_ add a new configuration using the plus button. You should choose “Debug” as the basis for the duplication and “Staging”, for example, as a name.

Creating a new configurations entry

Via _File — New — File… — Configuration Settings File_ you add three _.xcconfig_ files. These are named “Development.xcconfig”, “Staging.xcconfig”, and “Production.xcconfig”.

Creating a new “Configuration Settings File”

And while you’re at it, you can also create three “Config.plist” files for the three configurations. These files can all even have the same name if you save them in their respective directories.

Three xcconfig files for three configurations

However, these files shouldn’t be added to the target — otherwise, it wouldn’t be clear which of them is now in the bundle and which will be overwritten. More on that later.

So the _.xcconfig_ files are also used by the _Configurations_, you have to assign them as the base. To do this, you can expand the respective configuration in the _project settings_ and select the appropriate base for the respective configuration.

In the “debug” configuration that would be, for example, “Development”. This should also be done for “staging” and “release” to map on “Staging” and “Production”.

Setup “Based on Configuration File”

If you have problems with _CocoaPods_, you may need to delete the “Pods” directory and the “Podfile.lock” file and reinstall via `pod install`. Now, the project should build again. 😅

## Using .xcconfig files

The _.xcconfig_ files are now integrated and used, but they are still empty. 😙

They can be used to enter _Info.plist_ entries, _build settings_ and _user-defined settings_. For example, you could enter the following in _Development.xcconfig_:

`XCC_BUNDLE_NAME = Demo D`

`XCC_CONFIG_PATH = Development/Config.plist`

This creates two variables that you can then use in the _build phase_ and in the _Info.plist_. The variable names are arbitrary, but you should pay attention to possible collisions. That’s why I prefix them with _XCC_ for _XCodeConfig_.

In _Info.plist_, enter the value `${XCC_BUNDLE_NAME}` under “Bundle name”. The app icon on the device henceforth bears the name “Demo D”. If you add appropriate entries in the other configuration files — e.g., “Demo S” for _staging_ and “Demo” for the _production_ release, you can see immediately which build is currently on the device. 😌

The second variable should be used in a separate script in the _build phase_. To do this, create a new script entry in the _project settings_ under _build phase_ by using the plus button and the entry “New Run Script Phase”. The new entry can be named, for example, “Copy Config” and contain a simple `cp` command that just copies the appropriate _Config.plist_ into the _Generated_ directory.

Make sure the new “Copy Config” script entry is somewhere after “Dependencies” / “[CP] Check Pods Manifest.lock” and before “Compile Sources”.

Copy Config Script

Note that here the variable defined in the config is used with `${XCC_CONFIG_PATH}`. Via the _config_, one determines which _plist_ should be copied.

Under _Output Files_, you should possibly also enter the target file in order to ensure the next phase begins only if the file was actually copied.

Copy Config Script Output Files

Now only the _Config.plist_ in the _Generated_ directory has to be integrated into the target because this should then be copied into the _bundle_.

Config.plist Target Membership

Depending on the selected _configuration_, the corresponding _Config.plist_ will be copied to the _Generated_ directory during the _build phase_ and then into the app’s _bundle_.

## Schemes for configuration switching

In order to select the respective _configuration_, one doesn’t want to constantly adapt the _scheme_. It’s better to create a _scheme_ for each _configuration_ and then simply switch between the _schemes_.

Via _Product_ — _Scheme_ — _Manage Schemes…_, you can create new _schemes_. Here you always choose the same target but name the _scheme_ according to the _configuration_.

Creating Schemes for each Configuration

For each _scheme_, you have to select the respective _configuration_ under “Build Configuration”. So, for the _staging scheme_, select the _stage build configuration_.

Selecting Build Configuration

If you have configured the _schemes_ for all _configurations_, you can now easily switch between them and always use the corresponding _configuration_. 😀

Switching Schemes

## Decoding config files

Now that you have the appropriate _configuration_ started via the _scheme_ and the correct _Config.plist_ in the app’s _bundle_, you should also make use of it. 😋

The contents of the _Config.plist_ file can be easily decoded with a _PropertyListDecoder_ in a _Decodable_ struct. In the _DemoApp_ project, you can find the the _ConfigLoader_ in the _Shared_ framework to map the _Config.plist_ to the _Configuration_ struct.

As you can see, the _Configuration_ struct declares _testFlags_ as optional, so they don’t have to be included in a _Production_ version. Only the necessary data is in the _Production_ build. 😘

However, the _Development_ and _Staging_ environment cannot only use different _BaseURL_ s, but also different _TestFlags —_ for example, to use mocked server requests during development.

The Development Config.plist

The _Configurations_ are type-safe thanks to the struct and can be easily used in code when provided by the _dependencies_.

The _Config.plist_ is currently being loaded at runtime. With a corrupted config file, this can cause the app to crash due to the thrown exception. 😅

If you start loading the config file early after the app launches, it’ll crash as soon as you start the app for testing. That’s good enough in my opinion, because the config shouldn’t be faulty. And even if it is, then you should get a notice about it relatively quickly after each launch and be forced to resolve it.

Is it not possible to catch the error at compile time? With a code generator such as [SwiftGen](https://github.com/SwiftGen/SwiftGen), for example, you could convert the _plist_ file to Swift code in the _build phase_ and then have type-safe calls and no runtime crashes. 🧐

However, this approach has some problems:

1. The current SwiftGen template resolves nested levels with string dictionaries — i.e., the _testFlags_ would be resolved via string keys and that wouldn’t be type-safe anymore: `configuration.testFlags[“noSplash"]`
2. You could adapt the stencil template, but this isn’t so easy, with maintenance work required and possibly even changing the SwiftGen generator code. Here you have to ask yourself if it’s really worth it.
3. Depending on the _configuration_, the _testFlags_ are converted into code or not — i.e., in _Development_, the constant `static let testFlags: [String: Any]` is created but not in _Deployment —_ not even as _Optional_. This will have corresponding compiler errors at _Release_. Fixing these will most likely result in unclean workarounds. 😓

That’s why I think the approach to load the _config_ at runtime is better, provided the loading happens right after app start. A small _UITest_ on the CI server should be able to quickly and automatically detect the possible configuration file corruption use-case. So there’s no need to maintain SwiftGen. 😁

[Dev/Staging/Prod Configs in Xcode](https://betterprogramming.pub/how-to-create-development-staging-and-production-configs-in-xcode-ec58b2cc1df4)
