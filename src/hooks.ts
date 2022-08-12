import { useEffect, useLayoutEffect as _useLayoutEffect } from "react";

export const useLayoutEffect =
  typeof window !== "undefined" ? _useLayoutEffect : useEffect;
