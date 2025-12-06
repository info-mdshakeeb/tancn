import { Image, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export function FormGenerator() {
	return (
		<div className="flex flex-col h-full">
			<div className="mb-4 p-4 border-b">
				<h3 className="text-lg font-semibold text-primary">Generate</h3>
				<p className="text-sm text-muted-foreground">
					Generate forms with AI
				</p>
			</div>

			<ScrollArea className="flex-1 min-h-0">
				<div className="p-4 space-y-6">
					<div className="space-y-4">
						<h2 className="text-2xl font-bold tracking-tight">
							What can I help you build?
						</h2>

						<div className="flex gap-2">
							<Button variant="secondary" size="sm" className="rounded-full">
								<Sparkles className="w-3 h-3 mr-2" />
								Create
							</Button>
							<Button variant="ghost" size="sm" className="rounded-full">
								Remix
							</Button>
							<Button variant="ghost" size="sm" className="rounded-full">
								Tweak
							</Button>
						</div>
					</div>

					<div className="space-y-2">
						{[
							"Contact form with name, email, and message",
							"Job application form with resume upload",
							"Feedback survey with rating scale",
							"Event registration form with payment details",
							"Login form with email and password",
						].map((suggestion, i) => (
							<button
								key={i}
								className="w-full text-left p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors text-sm text-muted-foreground hover:text-foreground"
							>
								{suggestion}
							</button>
						))}
					</div>
				</div>
			</ScrollArea>

			<div className="p-4 border-t mt-auto">
				<div className="relative">
					<Textarea
						placeholder="Describe your form..."
						className="min-h-[100px] resize-none pr-12 pb-12 bg-muted/50 border-none focus-visible:ring-1"
					/>

					<div className="absolute bottom-3 left-3 flex gap-2">
						<Button variant="outline" size="sm" className="h-7 text-xs gap-1.5">
							<Sparkles className="w-3 h-3" />
							New chat
						</Button>
						<Button variant="outline" size="sm" className="h-7 text-xs gap-1.5">
							<Image className="w-3 h-3" />
							Image
						</Button>
					</div>

					<Button
						size="icon"
						className="absolute bottom-3 right-3 h-8 w-8 rounded-lg"
					>
						<Send className="w-4 h-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
