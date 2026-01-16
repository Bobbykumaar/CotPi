export default function AdmissionSection({ admission }: any) {
  if (!admission) return null;

  return (
    <section>
      <h2>Admission</h2>
      <p>Mode: {admission.mode?.join(", ")}</p>
      <p>Criteria: {admission.criteria}</p>
      <hr />
    </section>
  );
}
