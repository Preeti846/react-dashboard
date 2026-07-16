import Card from "../components/Card";

export default function Messages() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-ink-900">Messages</h1>

      <Card>
        <div className="flex h-80 items-center justify-center rounded-xl border border-dashed border-slate-300">
          <p className="text-lg text-slate-500">
            Messages Page
          </p>
        </div>
      </Card>
    </div>
  );
}