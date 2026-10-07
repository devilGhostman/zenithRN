import React, {Suspense, type ComponentType} from 'react';

export function suspendedTemplate<Props extends object>(
  Template: ComponentType<Props>,
  Fallback?: ComponentType,
): ComponentType<Props> {
  function SuspendedTemplate(props: Props) {
    return (
      <Suspense fallback={Fallback ? <Fallback /> : null}>
        <Template {...props} />
      </Suspense>
    );
  }

  return SuspendedTemplate;
}
