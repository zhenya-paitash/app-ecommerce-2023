"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Category } from "@prisma/client";
import { Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData: Category | null;
  billboards: Billboard[];
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  billboards
}) => {
  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit category' : 'Create category';
  const description = initialData ? 'Edit a category' : 'Add a new category';
  const toastMessage = initialData ? 'Category updated.' : 'Category created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      billboardId: '',
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data);
      }

      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`);
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success(`Category removed!`);
    } catch (error) {
      toast.error('Make sure you remove all products using this category first.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <AlertModal
        loading={loading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />

      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description={description}
        />

        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Category name"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={loading}
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                        />

                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {billboards.map((billboard: Billboard) => (
                        <SelectItem
                          key={billboard.id}
                          value={billboard.id}
                        >
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            className="ml-auto"
            type="submit"
            disabled={loading}
          >{action}</Button>
        </form>
      </Form>
    </>
  );
}