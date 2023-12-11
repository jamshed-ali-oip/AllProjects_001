import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";
import { useAuth } from "../context/Auth";
import { Loading } from "../components/ui/Loading";
import { auth } from "../firebase";


export const Router = () => {
  const { authData, loading } = useAuth();
  const [user, setUser] = useState(null);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user)
    })

    return () => unsubscribe();
  }, []);


  if (loading) {
    
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <AppStack />
      {/* {(user && authData) ? <AppStack /> : <AuthStack  />} */}
    </NavigationContainer>
  );
};
