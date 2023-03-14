import { useContext } from "react";
import { BuildContext } from "src/App";
export default function useBuild() {
  const build = useContext(BuildContext);
  return build === "development";
}
