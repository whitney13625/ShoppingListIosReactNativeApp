
// Dispatch<SetStateAction<T[]>> equals @Binding in Swift, control an component's state from outside

export function useOptimisticUpdate<T>(
  setState: React.Dispatch<React.SetStateAction<T[]>> 
) {
  // 回傳一個 execute function
  const execute = async (
    optimisticUpdate: (prev: T[]) => T[], 
    apiCall: () => Promise<void>,          
    rollback: (prev: T[]) => T[]
  ) => {
    try {
        setState(optimisticUpdate);
        await apiCall();
    } catch (error) {
        console.log('Error performing optimistic update', error);
        setState(rollback);
    }
  };

  return { execute };
}
