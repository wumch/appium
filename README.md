## Appium

[![NPM version](https://badge.fury.io/js/appium.svg)](https://npmjs.org/package/appium)
[![Monthly Downloads](https://img.shields.io/npm/dm/appium.svg)](https://npmjs.org/package/appium)

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fappium%2Fappium.svg?type=shield)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fappium%2Fappium?ref=badge_shield)

[![StandWithUkraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://github.com/vshymanskyy/StandWithUkraine/)

[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner2-direct.svg)](https://vshymanskyy.github.io/StandWithUkraine/)

Appium is an open-source, cross-platform test automation tool for native,
hybrid, mobile web and desktop apps. We support simulators (iOS), emulators
(Android), and real devices (iOS, Android, Windows, Mac).

:bangbang: Major documentation revision in progress

Appium is in the final stages of a major revision (to version 2.0). As such, the documentation
found around the web may not be correct. The current Appium 2.0 documentation is very much in
progress. Currently, it can be found [here](https://appium.github.io/appium/docs/en/2.0/).

### Drivers

Appium supports app automation across a variety of platforms, like iOS,
Android, and Windows. Each platform is supported by one or more "drivers",
which know how to automate that particular platform. Since version 2.0
all drivers have been isolated from the Appium server app and can
be managed independently using the [appium driver](https://appiumpro.com/editions/122-installing-appium-20-and-the-driver-and-plugins-cli) command line interface.

In general, the drivers management in Appium 2 is as simple as:

```bash
# To install a new driver from npm
appium driver install --source=npm appium-xcuitest-driver[@<version>]
# To install a driver from a local folder (useful for developers)
appium driver install --source=local /Users/me/sources/appium-xcuitest-driver
# To install a new driver from github (hm, maybe it's time to publish it to NPM?)
appium driver install --source=github appium/appium-xcuitest-driver

# To list already installed drivers
appium driver list --installed

# To update a driver (it must be already installed)
appium driver update xcuitest

# To uninstall a driver (it won't last forever, wouldn't it?)
appium driver uninstall xcuitest
```

#### Drivers Maintained By The Appium Team

These drivers are supported by Appium core members. Please report any issues
or suggestions regarding them to the corresponding GitHub issue tracker.
Refer to the corresponding driver Readme to know more on how to use it and its requirements.

Name | Description
--- | ---
[appium-xcuitest-driver](https://github.com/appium/appium-xcuitest-driver) | Allows automation of iOS native and web apps (via hybrid mode). Also supports tvOS. This driver is based on Apple's [XCTest framework](https://developer.apple.com/documentation/xctest) and can only use macOS as the host system.
[appium-uiautomator2-driver](https://github.com/appium/appium-uiautomator2-driver) | Allows automation of Android native and web apps (via hybrid mode). The driver is based on Google's [UiAutomator](https://developer.android.com/training/testing/other-components/ui-automator) framework.
[appium-espresso-driver](https://github.com/appium/appium-espresso-driver) | Allows automation of Android native apps. The driver is based on Google's [Espresso](https://developer.android.com/training/testing/espresso) framework.
[appium-mac2-driver](https://github.com/appium/appium-mac2-driver) | Allows automation of macOS native apps. Also supports tvOS. This driver is based on Apple [XCTest framework](https://developer.apple.com/documentation/xctest) and can only use macOS as the host system.
[appium-windows-driver](https://github.com/appium/appium-windows-driver) | Allows automation of Windows native and UWP apps. This driver is based on Microsoft's [WinAppDriver](https://github.com/microsoft/WinAppDriver) implementation and can only use Windows 10 as the host system.
[appium-gecko-driver](https://github.com/appium/appium-geckodriver) | Allows automation of Gecko-engine-based browsers, like Firefox on mobile and desktop platforms. Uses [geckodriver](https://github.com/mozilla/geckodriver/releases) command line tool provided by Mozilla for various platforms.
[appium-safari-driver](https://github.com/appium/appium-safari-driver) | Allows automation of Safari browser on mobile and desktop platforms . Uses the [safaridriver](https://www.manpagez.com/man/1/safaridriver/) command line tool provided by Apple as part of macOS.

#### Drivers Provided By Third Parties

These drivers are supported by different companies or communities.
Please report any issues related to their functionality to their
respective maintainers. If you are a developer yourself and have created a new useful
Appium2-compatible driver then don't hesitate to create a PR and add a link to
your driver into the below list.

<details>
  <summary>Drivers List</summary>

  Name | Description
  --- | ---
  [appium-youiengine-driver](https://github.com/YOU-i-Labs/appium-youiengine-driver) | Appium You.i Engine Driver is a test automation tool for devices of various platforms running applications built with [You.i Engine](http://www.youi.tv/youi-engine/)
  [appium-flutter-driver](https://github.com/appium-userland/appium-flutter-driver) | Allows automation of apps built using [Flutter](https://flutter.dev/) framework
  [appium-tizen-driver](https://github.com/Samsung/appium-tizen-driver) | Allows automation of apps built for devices running [Tizen OS](https://www.tizen.org/)
</details>

### Plugins

The concept of plugins is something new that has been added exclusively to Appium2. Plugins allow you to extend server functionality without changing the server code. Plugins could be managed similarly to drivers:

```bash
# To install an officially supported plugin
appium plugin install images
# To install a plugin from a local folder (useful for developers)
appium plugin install --source=local /Users/me/sources/images
# To install a new plugin from npm
appium plugin install --source=npm appium-device-farm

# To list already installed plugins
appium plugin list --installed

# To update a plugins (it must be already installed)
appium plugin update appium-device-farm

# To uninstall a plugin
appium plugin uninstall appium-device-farm
```

The main difference between drivers and plugins is that the latter must be explicitly enabled on server startup after it was installed (drivers are enabled by default after installation):

```bash
appium server --use-plugins=device-farm,images
```

#### Plugins Maintained By The Appium Team

These plugins are supported by Appium core members. Please report any issues
or suggestions regarding them to the corresponding GitHub issue tracker.
Refer to the corresponding plugin Readme to know more on how to use it.

Name | Description
--- | ---
[images](https://github.com/appium/appium/tree/master/packages/images-plugin) | This is an official Appium plugin designed to facilitate image comparison, visual testing, and image-based functional testing.
[relaxed-caps](https://github.com/appium/appium/tree/master/packages/relaxed-caps-plugin) | With the advent of Appium 2.0, the Appium server begins to require that all capabilities conform to the W3C requirements for capabilities. Among these requirements is one that restricts capabilities to those found in a predetermined set. Appium supports many additional capabilities as extension capabilities, and these must be accessed with the prefix appium: in front of the capability name. There are a lot of test scripts out there that don't conform to the requirement, and so this plugin is designed to make it easy to keep running these scripts even with the new stricter capabilities requirements beginning with Appium 2.0. Basically, it inserts the appium: prefix for you!
[universal-xml](https://github.com/appium/appium/tree/master/packages/universal-xml-plugin) | This is an official Appium plugin designed to make XML source retrieved from iOS and Android use the same node and attribute names, to facilitate cross-platform test writing.

#### Plugins Provided By Third Parties

These plugins are supported by different companies or communities.
Please report any issues related to their functionality to their
respective maintainers. If you are a developer yourself and have created a new useful
plugin then don't hesitate to create a PR and add a link to your plugin into the below list.

<details>
  <summary>Plugins List</summary>

  Name | Description
  --- | ---
  [appium-device-farm](https://github.com/AppiumTestDistribution/appium-device-farm) | This is an Appium plugin designed to manage and create driver session on connected android devices and iOS Simulators.
  [appium-reporter-plugin](https://github.com/AppiumTestDistribution/appium-reporter-plugin) | This Plugin generates standalone consolidated html report with screenshots. Report can be fetched from appium server, without worrying about heavy lifting such as screenshot capturing, report generation etc.
</details>

### Server Command Line Interface

In order to start sending commands to Appium over the wire it must be listening
on the URL where your client library expects it to listen.
Use the following commands to run and configure Appium server:

```bash
# Start the server on the default port and host (e.g. http://0.0.0.0:4723/)
appium server
# Start the server on the given port, host and use the base path prefix (the default prefix is /)
appium server -p 9000 -a 127.0.0.1 -pa /wd/hub

# Get the list of all supported command line parameters.
# This list would also include descriptions of driver-specific
# command line arguments for all installed drivers.
# Each driver and plugin must have their command line arguments
# exposed in a special JSON schema declared as a part of the corresponding
# package.json file.
appium server --help
```

Appium supports execution of parallel server processes as well as parallel driver sessions within
single server process. Refer the corresponding driver documentations regarding which mode is optimal
for the particular driver or whether it supports parallel sessions.

### Why Appium?

1. You usually don't have to recompile your app or modify it in any way, due
   to the use of standard automation APIs on all platforms.
2. You can write tests with your favorite dev tools using any
   [WebDriver](https://w3c.github.io/webdriver/webdriver-spec.html)-compatible
   language such as [Java](https://github.com/appium/java-client),
   [JavaScript](https://webdriver.io/), [Python](https://github.com/appium/python-client),
   [Ruby](https://github.com/appium/ruby_lib), [C#](https://github.com/appium/appium-dotnet-driver)
   with the Selenium WebDriver API. There are also various third party
   client implementations for other languages.
3. You can use any testing framework.
4. Some drivers, like xcuitest and uiautomator2 ones have built-in mobile web and
   hybrid app support. Within the same script, you can switch seamlessly between native
   app automation and webview automation, all using the WebDriver model that's already
   the standard for web automation.
5. You can run your automated tests locally and in a cloud. There are multiple
   cloud providers that support various Appium drivers (mostly
   targeting iOS and Android mobile automation).
6. [Appium Inspector](https://github.com/appium/appium-inspector) allows
   visual debugging of automated tests and could be extremely useful for
   beginners.

Investing in the
[WebDriver](https://w3c.github.io/webdriver/webdriver-spec.html) protocol means
you are betting on a single, free, and open protocol for testing that has become
a web standard. Don't lock yourself into a proprietary stack.

For example, if you use Apple's XCUITest library without Appium you can only
write tests using Obj-C/Swift, and you can only run tests through Xcode.
Similarly, with Google's UiAutomator or Espresso, you can only write tests in
Java/Kotlin. Appium opens up the possibility of true cross-platform native app
automation, for mobile and beyond. Finally!

If you're new to Appium or want a more comprehensive description of what this is all
about, please read our [Introduction to Appium Concepts](/docs/en/about-appium/intro.md).

### Requirements

Your environment needs to be set up for the particular platforms that you want
to run tests on. Each of the drivers above documents the requirements for their
particular brand of automation. At a minimum, you will need to be able to run
the recent [LTS](https://nodejs.org/en/about/releases/) Node.js version.

### Get Started

Check out our [Getting Started](/docs/en/about-appium/getting-started.md) guide
to get going with Appium.

There is also a sample code that contains [many examples of tests in a variety
of different languages](https://github.com/appium/appium/tree/master/sample-code)!

### Documentation

For prettily-rendered docs, please visit [appium.io](http://appium.io). You can
always find the full list of Appium doc pages at [Appium's GitHub
Repo](https://github.com/appium/appium/tree/master/docs/en/) as well.

[update-appium-io.yml](https://github.com/appium/appium/blob/master/ci-jobs/update-appium-io.yml) creates a PR
by [CI job](https://dev.azure.com/AppiumCI/Appium%20CI/_build?definitionId=37).
in the appium.io repository with the documentation update.

Once the PR has been merged, the latest documentation will be in [appium.io](http://appium.io)

### Contributing

Please take a look at our [contribution documentation](CONTRIBUTING.md)
for instructions on how to build, test, and run Appium from the source.

### Roadmap

Interested in where Appium is heading in the future? Check out the [Roadmap](ROADMAP.md)

### Project History, Credits & Inspiration

* [History](http://appium.io/history)
* [Credits](/docs/en/contributing-to-appium/credits.md)

### User Forums

Announcements and debates often take place on the [Discussion Group](https://discuss.appium.io),
be sure to sign up!

### Troubleshooting

We put together a [troubleshooting guide](/docs/en/writing-running-appium/other/troubleshooting.md).
Please have a look here first if you run into any problems. It contains instructions for checking
a lot of common errors and how to get in touch with the community if you're
stumped.

### License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fappium%2Fappium.svg?type=large)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fappium%2Fappium?ref=badge_large)
