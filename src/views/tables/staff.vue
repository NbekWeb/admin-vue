<template>
	<Layout>
		<EnCoder @create="getEnCoder" ref="userModalRef" />
		<PageHeader :title="title" :items="items" />

		<el-card shadow="never">
			<div class="card-header mb-4">
				<span class="card-title">Тарифы на устройства</span>
				<el-button type="primary" :icon="Plus" @click="userModalRef.open()">
					Создать пользователя
				</el-button>
			</div>
			<el-table
				:data="enCoders"
				style="width: 100%"
				border
				stripe
				v-loading="loading"
				:row-key="(row) => row.id"
				empty-text="Пользователи не найдены"
			>
				<el-table-column type="expand">
					<template #default="{ row }">
						<el-table :data="row.definitions" size="small" border>
							<!-- <el-table-column prop="id" label="ID" width="60" /> -->
							<el-table-column prop="id" label="ID" />
							<el-table-column prop="device.name" label="Устройство" />
							<el-table-column
								prop="device.factory_number"
								label="Заводской №"
							/>
							<el-table-column prop="device.func" label="Функция" />
							<el-table-column prop="number" label="Номер" />
							<el-table-column width="80">
								<template #default="{ row: defRow }">
									<el-button
										size="small"
										type="success"
										@click="editDefinition(defRow, row)"
										:icon="Edit"
									/>
								</template>
							</el-table-column>
						</el-table>
					</template>
				</el-table-column>

				<!-- <el-table-column prop="id" label="ID" width="60" /> -->
				<el-table-column label="Имя">
					<template #default="{ row }">
						{{ row.first_name }} {{ row.last_name }}
					</template>
				</el-table-column>
				<el-table-column prop="username" label="Username" />
				<el-table-column prop="phone" label="Телефон" />
				<el-table-column prop="email" label="Email" />

				<el-table-column label="Кол-во определений" width="180">
					<template #default="{ row }">
						{{ row?.definitions?.length }}
					</template>
				</el-table-column>
				<!-- <el-table-column width="80">
					<template #default="{ row }">
						<el-button
							size="small"
							type="warning"
							@click="userModalRef.open(row)"
							:icon="Edit"
						/>
					</template>
				</el-table-column> -->
			</el-table>
		</el-card>
	</Layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
import { getEnCoder_API } from "../../service/encoder";
import { Plus, Edit } from "@element-plus/icons-vue";
import EnCoder from "./components/EnCoder.vue";

const title = "Тарифы на устройства";
const items = [
	{ text: "Tables", href: "/" },
	{ text: "Тарифы на устройства", active: true },
];

const userModalRef = ref();
const enCoders = ref([]);
const loading = ref(false);

const getEnCoder = async () => {
	loading.value = true;
	const [error, res] = await getEnCoder_API();

	if (!error) {
		console.log("res", res);

		enCoders.value = res.results;
	} else {
		console.error("Ошибка загрузки пользователей:", error);
	}
	loading.value = false;
};

const editDefinition = (userRow, defRow) => {
	console.log("Edit definition", defRow, "for user", userRow);
   // TODO: ochish yoki modal ko'rsatish
   userModalRef.value.open(defRow, userRow)
};

onMounted(() => {
	getEnCoder();
});
</script>

<style scoped>
.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: 600;
	font-size: 18px;
	margin-bottom: 10px;
	padding-bottom: 20px;
}
</style>
