import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
function Avatar({ seed = "John Doe" }) {
  const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      seed,
      size: 128,
      // ... other options
    }).toDataUri();
  }, [seed]);

  return <img src={avatar} alt="Avatar" />;
}

export default Avatar;
