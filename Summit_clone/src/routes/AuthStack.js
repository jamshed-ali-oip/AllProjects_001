import React, { useEffect, useLayoutEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardOrganic from "../screens/OnboardOrganic";
import OnboardingMoreInfo from "../screens/OnboardingMoreInfo";
import OnboardPhoneNumber from "../screens/OnboardPhoneNumber";
import OnboardingAddress from "../screens/OnboardingAddress";

import OnboardEmail from "../screens/OnboardingEmail";
import OnboardNameScreen from "../screens/OnBoardingNameScreen";
import OnboardPassword from "../screens/OnBoardingPassword";
import OnboardingInfoReview from "../screens/OnboardingInfoReview";
import routes from "./routes";
import SignInScreen from "../screens/SignInScreen";
import { useAuth } from "../context/Auth";

const Stack = createNativeStackNavigator();

export const AuthStack = () => {

  const {loginCredentials:{loginError} } = useAuth();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right"
      }}
      initialRouteName={loginError ? routes.SIGN_IN_SCREEN : routes.ONBOARDING_ORGANIC_SCREEN}
    >
      <Stack.Screen
        name={routes.ONBOARDING_ORGANIC_SCREEN}
        component={OnboardOrganic}
      />

      {/* <Stack.Screen
        name={routes.ONBOARDING_MORE_INFO}
        component={OnboardingMoreInfo}
      /> */}

      <Stack.Screen
        name={routes.ONBOARDING_NAME_SCREEN}
        component={OnboardNameScreen}
      />

      <Stack.Screen
        name={routes.ONBOARDING_PHONENUMBER_SCREEN}
        component={OnboardPhoneNumber}
      />

      <Stack.Screen
        name={routes.ONBOARDING_EMAIL_SCREEN}
        component={OnboardEmail}
      />

      <Stack.Screen
        name={routes.ONBOARDING_PASSWORD_SCREEN}
        component={OnboardPassword}
      />

      <Stack.Screen
        name={routes.ONBOARDING_ADDRESS_SCREEN}
        component={OnboardingAddress}
      />

      <Stack.Screen
        name={routes.ONBOARDING_INFOREVIEW_SCREEN}
        component={OnboardingInfoReview}
      />

      <Stack.Screen
        name={routes.SIGN_IN_SCREEN}
        component={SignInScreen}
      />
    </Stack.Navigator>
  );
};
