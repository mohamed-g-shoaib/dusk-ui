import {
  Tooltip,
  TooltipTrigger,
  TooltipPopup,
} from "@/registry/dusk-ui/ui/tooltip";

export const TooltipWithArrowDemo = () => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <p>Hover me</p>
      </TooltipTrigger>
      <TooltipPopup showArrow>
        <p>Tooltip Content</p>
      </TooltipPopup>
    </Tooltip>
  );
};
