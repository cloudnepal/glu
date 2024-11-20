import { Handle, NodeProps, Position } from '@xyflow/react';
import { Package, GitBranch, CircleArrowUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PhaseNode as PhaseNodeType } from '@/types/flow';
import * as Tooltip from '@radix-ui/react-tooltip';
import { promotePhase } from '@/services/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ANNOTATION_OCI_IMAGE_URL } from '@/types/metadata';
import { getLabelColor } from '@/lib/utils';

const PhaseNode = ({ data }: NodeProps<PhaseNodeType>) => {
  const getIcon = () => {
    switch (data.source.name ?? '') {
      case 'oci':
        return <Package className="h-4 w-4" />;
      default:
        return <GitBranch className="h-4 w-4" />;
    }
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  const promote = async () => {
    setDialogOpen(false);
    await promotePhase(data.pipeline, data.name);
  };

  return (
    <div className="relative min-h-[80px] min-w-[120px] cursor-pointer rounded-lg border bg-background p-4 shadow-lg">
      <Handle type="source" position={Position.Right} style={{ right: -8 }} />

      <div className="flex items-center gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {getIcon()}
          <span className="truncate text-sm font-medium">{data.name}</span>
        </div>
        {data.depends_on && data.depends_on !== '' && (
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <CircleArrowUp
                  className="ml-2 h-4 w-4 flex-shrink-0 cursor-pointer transition-transform hover:rotate-90 hover:text-green-600"
                  onClick={() => setDialogOpen(true)}
                />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFadet select-none rounded bg-white px-[15px] py-2.5 text-sm leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                  sideOffset={5}
                >
                  Promote
                  <Tooltip.Arrow className="fill-white" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        )}
      </div>

      <div className="mt-2 flex items-center gap-2 text-xs">
        <span>Digest:</span>
        <span className="font-mono text-xs text-muted-foreground">{data.digest?.slice(-12)}</span>
      </div>

      {data.source.annotations?.[ANNOTATION_OCI_IMAGE_URL] && (
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span>Image:</span>
          <a
            href={`https://${data.source.annotations[ANNOTATION_OCI_IMAGE_URL]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate font-mono text-xs text-muted-foreground hover:text-primary hover:underline"
          >
            {data.source.annotations[ANNOTATION_OCI_IMAGE_URL]}
          </a>
        </div>
      )}

      <div className="mt-2 flex w-full flex-col">
        {data.labels &&
          Object.entries(data.labels).length > 0 &&
          Object.entries(data.labels).map(([key, value]) => (
            <div key={`${key}-${value}`} className="mb-2 flex">
              <Badge
                key={`${key}-${value}`}
                className={`whitespace-nowrap text-xs font-light ${getLabelColor(key, value)}`}
              >
                {key}: {value}
              </Badge>
            </div>
          ))}
      </div>

      <Handle type="target" position={Position.Left} style={{ left: -8 }} />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Promote Phase</DialogTitle>
            <DialogDescription>Are you sure you want to promote this phase?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={promote}>Promote</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { PhaseNode };
