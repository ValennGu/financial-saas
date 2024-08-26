"use client";

import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";

import { Loader2, PlusIcon } from "lucide-react";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";

const CategoriesPage = () => {
  const newCategory = useNewCategory();
  const deleteCategories = useBulkDeleteCategories();
  const categoryQuery = useGetCategories();
  const categories = categoryQuery.data || [];

  const isDisabled = categoryQuery.isLoading || deleteCategories.isPending;

  if (categoryQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y=2 lg:flex-row lg:items-center lg:justify-between">
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y=2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Categories</CardTitle>
          <Button size="sm" onClick={newCategory.onOpen}>
            <PlusIcon className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={categories}
            filterKey="name"
            onDelete={(rows) => {
              const ids = rows.map((r) => r.original.id);
              deleteCategories.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPage;
