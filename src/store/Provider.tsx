"use client";
import React from "react";
import store from ".";
import { Provider } from "react-redux";

export default function ReduxProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
