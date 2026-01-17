"use client";

import InquiryForm from "@/app/components/inquiry/InquiryForm";

export default function InquiryClient({ slug }: { slug: string }) {
  return <InquiryForm slug={slug} />;
}
