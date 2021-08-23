import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

export interface IPaperNav {
    header : string,
    hasEdit? : boolean,
    hasDelete? :boolean,
    onEdit?: () => void,
    onDelete?: () => void,
    ExternalIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
    externalIconAction?:() => void
}