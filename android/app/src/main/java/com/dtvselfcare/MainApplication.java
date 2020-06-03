package com.dtvselfcare;

import android.content.Context;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import com.wix.reactnativenotifications.RNNotificationsPackage;

import java.util.List;

import oracle.cloud.mobile.analytics.Analytics;
import oracle.cloud.mobile.authorization.AuthType;
import oracle.cloud.mobile.authorization.AuthorizationAgent;
import oracle.cloud.mobile.exception.ServiceProxyException;
import oracle.cloud.mobile.mobilebackend.MobileBackend;
import oracle.cloud.mobile.mobilebackend.MobileManager;
import oracle.cloud.mobile.notifications.Notifications;

public class MainApplication extends NavigationApplication {
    final String TAG = "DTVSelfCare";

    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }
    
  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    Context ctx = getApplicationContext();

      try {
          MobileBackend backend = MobileManager.getManager().getDefaultMobileBackend(ctx);
          AuthorizationAgent auth = backend.getAuthorization(AuthType.BASIC_AUTH);
          final Analytics analytics = backend.getServiceProxy(Analytics.class);
          analytics.logEvent("analytics_registered");
          analytics.endSession(ctx);

          final Notifications notifications = backend.getServiceProxy(Notifications.class);
          boolean result = notifications.initialize(ctx);
          Log.i(TAG, result ? "OMH notifications initialized" : "Could not initialize OMH notifications");
      } catch (ServiceProxyException e) {
          e.printStackTrace();
          Log.e(TAG, e.getMessage());
      }
  }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        List<ReactPackage> packages = new PackageList(this).getPackages();
        return packages;
    }
}