<template>
	<el-dialog
		v-model="visible"
		:title="form.id ? 'Создать тариф' : 'Изменить тариф'"
		width="500px"
		:before-close="onCancel"
	>
		<el-form label-position="top" :model="form" :rules="rules" ref="formRef">
			<el-form-item label="Название" prop="name">
				<el-input v-model="form.name" />
			</el-form-item>

			<el-form-item label="Цена, руб" prop="price">
				<el-input
					v-model="form.price"
					placeholder="Введите цену"
					type="text"
					clearable
					@input="onPriceInput"
				/>
			</el-form-item>

			<el-form-item label="Период" prop="unit_measurement">
				<el-select
					v-model="form.unit_measurement"
					placeholder="Выберите период"
				>
					<el-option label="День" value="day" />
					<el-option label="Месяц" value="month" />
					<el-option label="квартал" value="quarter" />
					<el-option label="полгода" value="halfyear" />
					<el-option label="Год" value="year" />
				</el-select>
			</el-form-item>

			<el-form-item label="Статус" prop="archive">
				<el-switch
					v-model="form.archive"
					active-text="Действующий"
					inactive-text="Не действующий"
				/>
			</el-form-item>
		</el-form>

		<template #footer>
			<el-button @click="onCancel">Отмена</el-button>
			<el-button type="primary" @click="onSubmit">Сохранить</el-button>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref, defineExpose, defineEmits } from "vue";
import { ElMessage } from "element-plus";
import { addTariff_API, editTariff_API } from "@/service/tariff";
const emit = defineEmits(["update:modelValue", "create"]);

// Visibility binding
const visible = ref(false);
const onPriceInput = (value) => {
	form.value.price = value.replace(/[^\d.,]/g, "");
};
// Form state & validation
const formRef = ref(null);
const form = ref({
	name: "",
	price: null,
	unit_measurement: "day",
	archive: true,
});
const rules = {
	name: [{ required: true, message: "Введите название", trigger: "submit" }],
	price: [{ required: true, message: "Введите цену", trigger: "submit" }],
};

// Handlers
const onSubmit = () => {
	formRef.value.validate(async (valid) => {
		if (valid) {
			const [error] = form.value.id ? await editTariff_API(form.value) :await addTariff_API(form.value);

			if (error) {
				ElMessage.error("Ошибка");
				visible.value = false;
				return;
			}
			emit("create");
			visible.value = false;
			ElMessage.success(form.value.id ? "Тариф создан" : "Тариф изменился");
		}
	});
};
function open(data = null) {
   visible.value = true;
   if (data) {
      form.value = {...data}
   }
}
const onCancel = () => {
	visible.value = false;
};
defineExpose({
	open,
});
</script>

<style scoped>
.card-header {
	/* Берем стиль из родителя, если нужно */
}
</style>
