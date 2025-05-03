
import { Button } from '@/components/ui/button';
import { useAppKitAccount } from '@reown/appkit/react';

export const SmartContractActionButtonList = () => {
  const { isConnected } = useAppKitAccount();
  
  return (
    <div className="mt-4">
      {isConnected ? (
        <div className="space-y-2">
          <h3 className="text-lg font-medium mb-2">Smart Contract Interactions</h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">Read Contract</Button>
            <Button variant="outline">Write Contract</Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
