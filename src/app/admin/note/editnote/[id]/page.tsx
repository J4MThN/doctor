import EditPoint from "@/src/modules/Admin/admin/components/Point/EditPoint/EditPoint";
import { notesService } from "@/src/modules/Admin/admin/services/notes.service";

export async function generateStaticParams() {
  const notes = await notesService.getAll();

  return notes.map((note) => ({
    id: String(note.id),
  }));
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <EditPoint id={id} />;
};

export default page;
