import { useEffect, useState } from "react";
import { Flex, Card, Text, Table } from "@radix-ui/themes"
import { getCategories } from "@/services/category.service"
import { TypeCategoriesAll } from "@/Types/response/response.category"
import DialogAdd from "./components/dialogAddCategory";
import DialogEdit from "./components/dialogEditCategory";
import AlertDialogDelete from "./components/alertDialogDeleteCategory";



export default function Categoriesfeature() {
    const [categories, setCategories] = useState<TypeCategoriesAll[]>([]);
    const getCategoriesData = () => {
        getCategories().then((res) => {
            console.log(res);
            setCategories(res.responseObject)
        })
    }
    useEffect(() => {
        getCategoriesData()
    }, [])


    return (
        <div className="container wfull pt-2">
            <Card variant="surface" className="w-600 m-auto" >
                <Flex className="W-full" direction="row" gap="2">
                    <Text as="div" size="2" weight="bold">Categories</Text>
                    <DialogAdd getCategoriesData={getCategoriesData} />
                </Flex>

                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Category Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Edit</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {categories && categories.map((category: TypeCategoriesAll) => (
                            <Table.Row key={category.id}>
                                <Table.ColumnHeaderCell>{category.id}</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>{category.category_name}</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>
                                    <DialogEdit
                                        getCategoriesData={getCategoriesData}
                                        id={category.id}
                                        category_name={category.category_name}
                                    />
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>
                                    <AlertDialogDelete
                                        getCategoriesData={getCategoriesData}
                                        id={category.id}
                                        category_name={category.category_name}
                                    />
                                </Table.ColumnHeaderCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Card >
        </div>
    )
}