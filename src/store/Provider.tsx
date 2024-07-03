"use client";
import { Provider } from "react-redux";
import store from ".";
import React from "react";

export default function ReduxProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
