import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SelectContent, SelectTrigger, SelectValue, SelectItem } from "../ui/select"; // Combined imports
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button"; // Assuming you have a Button component

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText }) {
    function renderInputsByComponentType(controlItem) {
        let element = null;
        const value = formData[controlItem.name] || '';

        switch (controlItem.componentType) {
            case 'input':
                element = (
                    <Input
                        name={controlItem.name}
                        placeholder={controlItem.placeholder}
                        id={controlItem.name}
                        type={controlItem.type}
                        value={value}
                        onChange={event =>
                            setFormData({
                                ...formData,
                                [controlItem.name]: event.target.value,
                            })
                        }
                    />
                );
                break;

            case 'select':
                element = (
                    <Select onValueChange={(value) => setFormData({
                        ...formData,
                        [controlItem.name]: value,
                    })}
                    value={value}>
                        <SelectTrigger>
                            <SelectValue placeholder={controlItem.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {controlItem.options && controlItem.options.length > 0
                                ? controlItem.options.map(optionItem => (
                                    <SelectItem key={optionItem.id} value={optionItem.id}>
                                        {optionItem.label}
                                    </SelectItem>
                                  )) 
                                : null
                            }
                        </SelectContent>
                    </Select>
                );
                break;

            case 'textarea':
                element = (
                    <Textarea
                        name={controlItem.name}
                        placeholder={controlItem.placeholder}
                        id={controlItem.name}
                        value={value}
                        onChange={event =>
                            setFormData({
                                ...formData,
                                [controlItem.name]: event.target.value,
                            })
                        }
                    />
                );
                break;

            default:
                element = (
                    <Input
                        name={controlItem.name}
                        placeholder={controlItem.placeholder}
                        id={controlItem.name}
                        type={controlItem.type}
                        onChange={event =>
                            setFormData({
                                ...formData,
                                [controlItem.name]: event.target.value,
                            })
                        }
                    />
                );
                break;
        }

        return element;
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {formControls.map(controlItem => (
                    <div className="grid w-full gap-1.5" key={controlItem.name}>
                        <Label className="mb-1">{controlItem.label}</Label> {/* Make sure to use the correct property name */}
                        {renderInputsByComponentType(controlItem)}
                    </div>
                ))}
            </div>
            <Button type="submit" className="mt-2 w-full">
                {buttonText || 'Submit'}
            </Button>
        </form>
    );
}

export default CommonForm;
