import { Delete, Plus } from "lucide-react";
import { UnifiedFormElementsDropdown } from "@/components/form-components/form-elements-dropdown";
import { Button } from "@/components/ui/button";
import useFormBuilderState from "@/hooks/use-form-builder-state";
import { addFormStep, removeFormStep } from "@/services/form-builder.service";
import type { FormStep } from "@/types/form-types";
//======================================
export function StepContainer({
	children,
	stepIndex,
}: {
	children: React.ReactNode;
	stepIndex: number;
}) {
	const { formElements } = useFormBuilderState();
	const isMultiStep =
		Array.isArray(formElements) &&
		formElements.length > 0 &&
		formElements[0]?.stepFields;
	const totalSteps = isMultiStep ? (formElements as FormStep[]).length : 0;
	return (
		<div className="rounded-lg px-3 md:px-4 md:py-5 py-4 border-dashed border bg-muted">
			<div className="flex items-center justify-between mb-3">
				<UnifiedFormElementsDropdown
					context="multistep"
					stepIndex={stepIndex}
				/>
				<div className="text-muted-foreground center font-medium pr-2">
					Step {stepIndex + 1}
				</div>
			</div>
			<div className="space-y-3">{children}</div>
			<div className="flex items-center justify-end px-2 pt-4">
				<div className="flex items-center justify-end gap-3">
					{totalSteps > 1 && (
						<Button
							onClick={() => removeFormStep(stepIndex)}
							variant="outline"
							className="rounded-lg"
							type="button"
						>
							<Delete />
							<span>Remove Step</span>
						</Button>
					)}
					<Button
						type="button"
						className="rounded-lg"
						onClick={() => addFormStep(stepIndex)}
					>
						<Plus />
						<span>Add Step</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
