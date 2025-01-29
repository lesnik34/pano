import { Button } from "@heroui/react";
import { BiBell } from 'react-icons/bi';

const Notifications = () => (
  <Button className="px-0 min-w-16" color="default" variant="ghost" startContent={<BiBell size={20} />}>
    2
  </Button>
);

export default Notifications;
