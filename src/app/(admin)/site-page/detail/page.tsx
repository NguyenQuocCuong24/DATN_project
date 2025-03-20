"use client";

import { pageManageApiRequest } from "@/apiRequests/page";
import { usePageStore } from "@/stores/pageStores";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect } from "react";
import PageSetting from "../_components/PageSetting";
import FormCreatePage from "../_components/FormCreatePage";
import { useHeaderStore } from "@/stores/headerStores";
import { TDefaultFormType } from "@/types/common.type";
import { renderTitleFormSitePage } from "@/types/page.type";

const CreatePageContent = () => {
  const params = useSearchParams();
  const id = params.get("id");
  const type = params.get("type");
  const { updateSelectedPage, switchKindOfPage } = usePageStore();
  const { updateTitle } = useHeaderStore();
  const handleAPISeoPage = useCallback(
    async (id: string) => {
      const pageDetails = await pageManageApiRequest.getPageSeoById(id);
      console.log("pageDetails", pageDetails);
      updateSelectedPage(pageDetails.payload);
    },
    [updateSelectedPage]
  );

  useEffect(() => {
    updateTitle(renderTitleFormSitePage[type as TDefaultFormType]);
    switchKindOfPage("page");
    if (!id) return;
    handleAPISeoPage(id);
  }, [params, switchKindOfPage, handleAPISeoPage, id]);
  if (!id) return <FormCreatePage />;
  return <PageSetting />;
};

const CreatePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreatePageContent />
    </Suspense>
  );
};

export default CreatePage;
